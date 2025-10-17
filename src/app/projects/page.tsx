import SmartCard from "@/components/widgets/SmartCard";
import { LayerProvider } from "@/customContext/LayerContext";

// create projects page
export default function Projects() {
    return (
        <LayerProvider>
            <SmartCard x={873}
                y={135}
                height={520}
                width={390}
                color="red"
                title="That's Me!"
                type="image"
                imageUrl="./images/profile.jpeg"
                // alt="Ankur Singh"
                caption="Always ready to tackle new chalanges!" />
            <SmartCard
                x={280}
                y={170}
                height={160}
                width={560}
                type="text"
                color="blue"
                content="Hi, I'm a Full Stack Developer passionate about creating amazing web experiences.\n I love building interactive applications and exploring new technologies. Currently focused on React, TypeScript, and modern web development."
            />
            <SmartCard
                x={250}
                y={365}
                height={190}
                width={590}
                type="sticky"
                title={"Education"}
                content={
                    "Bachelor of Computer Applications (MGKVP Varanasi, Uttar Pradesh, India)\nIntermediate (Colonelganj Inter College Prayagraj, Uttar Pradesh, India)\nHigh School (St. Xavier's High School Robertsganj, Sonbhadra, Uttar Pradesh, India)\nAnd I'm a continuous learning enthusiast"
                }
                color={"pink"}
            />
            <SmartCard
                x={1296}
                y={250}
                height={300}
                width={280}
                type="sticky"
                title={"Background"}
                content={
                    "I have 2+ years of experience in web development, specializing in React, Node.js, MongoDb, Websockets and modern web technologies. Previously I have worked with Ucertify.com as Web Developer for 1 year and with Naygon Technologies as Full-stack Developer for 1 years. And currently I'm working as freelancer."
                }
                color={"yellow"}
            />
            <SmartCard
                x={310}
                y={590}
                height={200}
                width={530}
                type="sticky"
                title={"Core Skills"}
                content={
                    "Frontend: React, TypeScript, Tailwind CSS, BootStrap, JavaScript, HTML, CSS \nBackend: Node.js, Express \nDatabase: MongoDb, MySQL, Firebase \nTools: Socket.io, Git, Docker, AWS, Canva, Figma \nOther Languages: C, C++, PHP"
                }
                color={"green"}
            />

            <SmartCard
                x={873}
                y={688}
                height={220}
                width={240}
                type="list"
                color="orange"
                title="Frontend Technologies"
                items={[
                    "React & Next.js",
                    "TypeScript",
                    "Tailwind CSS",
                    "HTML5 & CSS3",
                    "JavaScript ES6+",
                ]} />
            <SmartCard
                x={873}
                y={941}
                height={200}
                width={240}
                type="list"
                color="purple"
                title="Backend Technologies"
                items={[
                    "Node.js & Express",
                    "MongoDB & MySQL",
                    "Rest APIs",
                    "Socket.io",
                ]} />
            <SmartCard
                x={1146}
                y={800}
                height={220}
                width={240}
                type="list"
                color="cyan"
                title="Development Tools"
                items={[
                    "Git Bash & GitHub",
                    "VS Code",
                    "Figma & Canva",
                    "Docker",
                    "AWS & Vercel",
                ]} />


            <SmartCard
                x={540}
                y={1174}
                height={240}
                width={300}
                type="social"
                color="lime"
                title="Follow Me"
                links={[
                    { platform: "twitter", label: "Twitter", url: "https://twitter.com" },
                    { platform: "facebook", label: "Facebook", url: "https://facebook.com" },
                    { platform: "whatsapp", label: "Whatsapp", url: "https://facebook.com" },
                    { platform: "github", label: "Github", url: "https://github.com" },
                    { platform: "discord", label: "Discord", url: "https://github.com" },
                    { platform: "reddit", label: "Reddit", url: "https://github.com" },
                ]} />

            <SmartCard
                x={873}
                y={1174}
                height={460}
                width={360}
                type="contact"
                color="gray"
                title="Get in Touch"
                placeholder="We’re here to help!" />
        </LayerProvider>
    )
}