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
                            <li className='pb-2'>Developed and maintained high-quality, scalable React applications following best practices.</li>
                            <li className='pb-2'>Collaborated closely with UX/UI designers to build responsive and user-friendly interfaces.</li>
                            <li className='pb-2'>Optimized application performance using lazy loading, memoization, and code-splitting.</li>
                            <li className='pb-2'>Integrated frontend applications with RESTful APIs and GraphQL services.</li>
                            <li className='pb-2'>Ensured cross-browser compatibility and accessibility compliance (WCAG 2.1).</li>
                            <li className='pb-2'>Implemented testing strategies using Jest, React Testing Library, and Cypress.</li>
                            <li className='pb-2'>Led code reviews, provided mentorship, and enforced coding best practices.</li>
                            <li className='pb-2'>Worked on CI/CD pipelines for automated testing and deployment.</li>
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
