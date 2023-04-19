import React, { useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'

function capitalize(str) {
    return str
        .trim()
        .split(' ')
        .map(el => el[0].toLocaleUpperCase() + el.slice(1))
        .join(' ')
}

function App() {
    const [person, setPerson] = useState('')
    const [role, setRole] = useState('')
    const [company, setCompany] = useState('')
    const [description, setDescription] = useState('')
    const [myName, setMyName] = useState('')
    const [isNameEdited, setIsNameEdited] = useState(false)
    const [templates, setTemplates] = useState([])
    const [editedTemplate, setEditedTemplate] = useState(-1)
    const onData = ({personName, roleName, companyName, jobDescription}) => {
        setPerson(capitalize(personName))
        setRole(roleName)
        setCompany(companyName)
        setDescription(jobDescription)
    }
    useEffect(() => {
        chrome.runtime.onMessage.addListener(
            function(request, sender, sendResponse) {
                if (request?.data) {
                    onData(request.data)
                }
            }
        );
        (async () => {
            const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true})
            chrome.tabs.sendMessage(tab.id, {grabData: true})
        })();
        (async () => {
            const res = await chrome.storage.local.get(['templates', 'myName'])
            if (res.templates) setTemplates(res.templates)
            if (res.myName) setMyName(res.myName)
        })();
    }, [])
    const copy = (text) => () => {
        navigator.clipboard.writeText(text)
    }

    const addTemplate = () => {
        setTemplates([...templates, ''])
        setEditedTemplate(templates.length)
    }
    const removeTemplate = (index) => () => {
        const newTemplates = templates.toSpliced(index, 1)
        setTemplates(newTemplates)
        chrome.storage.local.set({ templates: newTemplates })
    }
    const onTemplateChange = (index) => (e) => {
        const newTemplates = [...templates]
        newTemplates[index] = e.target.value
        setTemplates(newTemplates)
    }
    const editTemplate = (index) => () => {
        setEditedTemplate(index)
    }
    const finishEditTemplate = () => {
        setEditedTemplate(-1)
        chrome.storage.local.set({ templates })
    }
    const editName = () => {
        setIsNameEdited(true)
    }
    const finishEditName = () => {
        setIsNameEdited(false)
        chrome.storage.local.set({ myName })
    }
    const templatesToRender = templates.map(el => {
        let text = el
        if (person) text = text.replace('[person]', person)
        if (company) text = text.replace('[company]', company)
        if (role) text = text.replace('[role]', role)
        if (myName) text = text.replace('[my_name]', myName)
        if (description) text = text.replace('[description]', description)
        return text
    })
    return <div>
        {templates.map((el, index) => {
            const isEdited = index === editedTemplate
            const text = templatesToRender[index]
            return <div key={index} className='row'>
                {isEdited
                    ? <div>
                        <textarea className='textinput' value={el} onChange={onTemplateChange(index)} />
                        <button onClick={finishEditTemplate}>save</button>
                    </div>
                    : <div>
                        {text.split('\n').map((el, i) => <p key={i}>{el}</p>)}
                        <div className='btnContainer'>
                            <button onClick={editTemplate(index)}>edit</button>
                            <button onClick={removeTemplate(index)}>del</button>
                            <button onClick={copy(text)} className='copyBtn'>copy</button>
                        </div>
                        
                    </div>}
            </div>
        })}
        <div className='row'>
            <p>Add new template using placeholders [person], [company], [role], [my_name], [description]</p>
            <button onClick={addTemplate}>add</button>
        </div>
        <div className='row'>
            {isNameEdited
                ? <div>
                    <textarea rows={1} className='textinput' value={myName} onChange={e => setMyName(e.target.value)}/>
                    <button onClick={finishEditName}>save</button>
                </div>
                : <div>
                    <p>Name: {myName}</p>
                    <button onClick={editName}>edit</button>
                </div>}
        </div>
    </div>
}

const root = createRoot(document.getElementById('root'))
root.render(<App />)