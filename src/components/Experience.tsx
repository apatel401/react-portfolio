import { Timeline } from './Timeline'

const Experience = () => {
    const data = [
        {
            title: "TVO Media Education Group",
            jobTitle: "Software Developer",
            date: "2019 - Present",
            content: (
                <div>
                    <div className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        <ul className='list-disc marker:text-sky-400 pl-6 mt-2'>
                            <li className='pb-2'>Designed and delivered enterprise-scale SaaS, cloud-native web applications using React.js, Node.js, and TypeScript, deployed via AWS CDK with infrastructure-as-code best practices.</li>
                            <li className='pb-2'>Architected and maintained secure, multi-tenant REST and GraphQL APIs for SaaS platforms, integrating with Amazon Aurora MySQL, DynamoDB, and MongoDB, including data modeling, schema governance, and performance optimization.</li>
                            <li className='pb-2'>Implemented serverless and event-driven SaaS workflows using AWS Lambda, Step Functions, and S3, enabling high availability, fault tolerance, and cost-efficient scaling.</li>
                            <li className='pb-2'>Built CI/CD pipelines for SaaS environments using GitLab CI/CD and AWS CodePipeline, automating build, test, security scanning, and containerized deployments with Docker.</li>
                            <li className='pb-2'>Established SaaS monitoring, logging, and operational visibility using AWS CloudWatch, supporting proactive incident detection and faster root-cause resolution.</li>
                            <li className='pb-2'>Worked in Agile enterprise SaaS teams (Scrum/Kanban), contributing to sprint planning, backlog grooming, code reviews, release management, and cross-team coordination.</li>
                            <li className='pb-2'>Partnered with UX, QA, DevOps, and Product teams to translate Figma designs into scalable SaaS interfaces, ensuring accessibility, responsiveness, and API contract alignment.</li>
                            <li className='pb-2'>Enforced coding standards, security controls, and documentation to support compliant, maintainable, and scalable SaaS systems.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: "Taqqut Productions",
            jobTitle: "Full Stack Developer",
            date: "Jan 2019 - Sep 2019",
            content: (
                <div>
                    <div className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        <ul className='list-disc marker:text-sky-400 pl-6 mt-2'>
                            <li className='pb-2'>Spearheaded React-based projects, crafting dynamic and engaging web applications that met and exceeded</li>
                            <li className='pb-2'>client expectations for both functionality and aesthetics.</li>
                            <li className='pb-2'>Leveraged WordPress to develop and maintain responsive websites, ensuring seamless user experiences
                                and ease of content management for clients.</li>
                            <li className='pb-2'>Demonstrated proficiency in JavaScript across various projects, optimizing website performance and
                                interactivity to captivate user engagement.</li>
                            <li className='pb-2'>Seamlessly integrated Shopify into e-commerce solutions, facilitating secure online transactions and
                                enhancing user trust and satisfaction.</li>
                            <li className='pb-2'>Played a pivotal role in the internationalization and localization of websites, tailoring content and functionality
                                to diverse global audiences, thereby expanding reach and user engagement.</li>
                            <li className='pb-2'>Delved into the exciting world of game development using JavaScript, creating immersive and entertaining
                                gaming experiences that captivated users and drove engagement.</li>
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: "Mahatma Gandhi Kashi Vidhyapith",
            jobTitle: "Bachelor of Computer Applications",
            date: "June 2013 - May 2016",
            content: (
                <div>

                </div>
            ),
        },
    ];
    return (
        <div>
            <Timeline data={data} />
        </div>
    )
}

export default Experience
