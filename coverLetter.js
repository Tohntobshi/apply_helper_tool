export function getCoverLetter(name, role, company) {
    if (company.endsWith('.'))
        company = company.slice(0, company.length - 1)
    return (name ? `Dear ${name},\n` : 'Hello,\n') +
    `I am writing to express my interest in the ${role} position at ${company}. \
With 5 years of experience in web and mobile development, I am confident in my ability to contribute to the success of your team. \
I am proficient in JavaScript, TypeScript, React, Angular, Node.js, and Express with knowledge in C++, Kotlin and Python. \
Also I have great problem-solving and team collaboration skills. \
And I am excited to bring my skills and experience to ${company} and contribute to the development of high-quality applications. \
Thank you for considering my application.
Sincerely,
Anton
P. S. If you have other positions which may be more suitable for my skillset, I will also consider them.`
}