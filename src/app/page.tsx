"use client";
import StickyCard from "@/components/widgets/StickyCard";
import TextCard from "@/components/widgets/TextCard";
import SocialCard from "@/components/widgets/SocialCard";
import {
  Twitter,
  Facebook,
  Github,
  ExternalLink as ExternalLinkIcon,
} from "lucide-react";
import ImageCard from "@/components/widgets/ImageCard";
import ContactCard from "@/components/widgets/ContactCard";
import ListCard from "@/components/widgets/ListCard";
import { LayerProvider } from "@/customContext/LayerContext";
const iconMap = {
  twitter: Twitter,
  facebook: Facebook,
  github: Github,
};
const links = [
  {
    platform: "twitter",
    label: "My Twitter",
    url: "https://twitter.com/myprofile",
  },
  {
    platform: "facebook",
    label: "Facebook Page",
    url: "https://facebook.com/myprofile",
  },
  {
    platform: "github",
    label: "GitHub Repo",
    url: "https://github.com/myrepo",
  },
];
export default function Home() {
  function handleLinkClick(url: string) {
    window.open(url, "_blank"); // opens the URL in a new tab
  }
  return (
    <LayerProvider>
      {/* Example movable + resizable component */}
      <ImageCard
        x={873}
        y={135}
        height={520}
        width={390}
        color="red"
        title="That's Me!"
        imageUrl="./images/profile.jpeg"
        alt="Ankur Singh"
        caption="Always ready to tackle new chalanges!"
      />
      <TextCard
        x={280}
        y={170}
        height={160}
        width={560}
        content={
          "Hi, I'm a Full Stack Developer passionate about creating amazing web experiences.\n I love building interactive applications and exploring new technologies. Currently focused on React, TypeScript, and modern web development."
        }
        color={"blue"}
      />
      <StickyCard
        x={250}
        y={365}
        height={190}
        width={590}
        title={"Education"}
        content={
          "Bachelor of Computer Applications (MGKVP Varanasi, Uttar Pradesh, India)\nIntermediate (Colonelganj Inter College Prayagraj, Uttar Pradesh, India)\nHigh School (St. Xavier's High School Robertsganj, Sonbhadra, Uttar Pradesh, India)\nAnd I'm a continuous learning enthusiast"
        }
        color={"pink"}
      />
      <StickyCard
        x={1296}
        y={250}
        height={300}
        width={280}
        title={"Background"}
        content={
          "I have 2+ years of experience in web development, specializing in React, Node.js, MongoDb, Websockets and modern web technologies. Previously I have worked with Ucertify.com as Web Developer for 1 year and with Naygon Technologies as Full-stack Developer for 1 years. And currently I'm working as freelancer."
        }
        color={"yellow"}
      />
      <StickyCard
        x={310}
        y={590}
        height={200}
        width={530}
        title={"Core Skills"}
        content={
          "Frontend: React, TypeScript, Tailwind CSS, BootStrap, JavaScript, HTML, CSS \nBackend: Node.js, Express \nDatabase: MongoDb, MySQL, Firebase \nTools: Socket.io, Git, Docker, AWS, Canva, Figma \nOther Languages: C, C++, PHP"
        }
        color={"green"}
      />
      <ListCard
        x={873}
        y={688}
        height={220}
        width={240}
        color="orange"
        title="Frontend Technologies"
        items={[
          "React & Next.js",
          "TypeScript",
          "Tailwind CSS",
          "HTML5 & CSS3",
          "JavaScript ES6+",
        ]}
      />
      <ListCard
        x={873}
        y={941}
        height={200}
        width={240}
        color="purple"
        title="Backend Technologies"
        items={[
          "Node.js & Express",
          "MongoDB & MySQL",
          "Rest APIs",
          "Socket.io",
        ]}
      />
      <ListCard
        x={1146}
        y={800}
        height={220}
        width={240}
        color="cyan"
        title="Development Tools"
        items={[
          "Git Bash & GitHub",
          "VS Code",
          "Figma & Canva",
          "Docker",
          "AWS & Vercel",
        ]}
      />
      <SocialCard
        x={540}
        y={1174}
        height={240}
        width={300}
        color={"lime"}
        title="Socials"
        links={links}
        iconMap={iconMap}
        handleLinkClick={handleLinkClick}
        ExternalLink={ExternalLinkIcon}
      />

      <ContactCard
        x={873}
        y={1174}
        height={460}
        width={360}
        color="gray"
        title="Get in Touch"
        placeholder="We’re here to help!"
      />
    </LayerProvider>
  );
}
