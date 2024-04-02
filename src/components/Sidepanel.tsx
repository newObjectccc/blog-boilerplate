"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Flower,
  FolderHeart,
  Forward,
  Github,
  Home,
  PencilLine,
  Shell,
  Slack,
  SquareDashedBottomCode,
  Terminal,
  TrafficCone,
  Twitter,
  UnfoldVertical,
  Video,
} from "lucide-react";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

const navList = [
  {
    title: "Home",
    href: "/",
    prefix: <Home size={16} />,
  },
  { title: "Writing", href: "/writing", prefix: <PencilLine size={16} /> },
  { title: "Lify", href: "/lify", prefix: <Shell size={16} /> },
  { title: "Stack", href: "/stack", prefix: <Slack size={16} /> },
  { title: "Workspace", href: "/workspace", prefix: <TrafficCone size={16} /> },
  { title: "Bookmarks", href: "/bookmarks", prefix: <FolderHeart size={16} /> },
];

const socialList = [
  { title: "GitHub", href: "", prefix: <Github size={16} /> },
  { title: "X (Twitter)", href: "", prefix: <Twitter size={16} /> },
  { title: "Bilibili", href: "", prefix: <Flower size={16} /> },
];

const openSourceList = [
  { title: "V2G", href: "", prefix: <Video size={16} /> },
  {
    title: "BeautyCode",
    href: "",
    prefix: <SquareDashedBottomCode size={16} />,
  },
  { title: "Vtabs", href: "", prefix: <UnfoldVertical size={16} /> },
  { title: "Bup", href: "", prefix: <Terminal size={16} /> },
];

export default function Sidepanel() {
  const selectedLayoutSegment = useSelectedLayoutSegment();
  console.log("🚀 ~ Sidepanel ~ selectedLayoutSegment:", selectedLayoutSegment);
  return (
    <aside className="scrollable-area relative w-full flex-col text-sm hidden bg-zinc-50 p-3 lg:flex lg:flex-col lg:border-r lg:w-60 xl:w-72">
      <div className="mb-4 p-2 flex flex-row flex-nowrap gap-2">
        <Avatar>
          <AvatarImage src="/avatar.png" alt="vespser" />
          <AvatarFallback>vesper</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="font-semibold tracking-tight">Vesper</h1>
          <p className="text-gray-600">Front-End Engineer</p>
        </div>
      </div>
      <nav className="flex flex-col gap-1">
        {navList.map((navItem, index) => {
          const isSelected =
            (selectedLayoutSegment ?? "") === navItem.href.replace("/", "");
          const commonClasses =
            "group flex items-center justify-between rounded-lg p-2";
          const selectedClasses = isSelected
            ? "bg-black text-white"
            : "hover:bg-gray-200";
          const borderClasses = isSelected
            ? "border-gray-600 bg-gray-700 text-gray-200 group-hover:border-gray-600"
            : "border-gray-200 bg-gray-100  text-gray-500  group-hover:border-gray-300";
          return (
            <Link
              key={navItem.href}
              href={navItem.href}
              className={`${commonClasses} ${selectedClasses}`}
            >
              <span className="flex items-center">
                {navItem.prefix}
                <span className="ml-2 font-medium">{navItem.title}</span>
              </span>
              <span className=" "></span>
              <span
                className={`hidden h-5 w-5 place-content-center rounded border text-xs font-medium transition-colors duration-200 lg:grid ${borderClasses}`}
              >
                {index + 1}
              </span>
            </Link>
          );
        })}
      </nav>
      <Separator className="my-5" />
      <span className="px-2 text-xs mb-2 font-medium leading-relaxed text-gray-600">
        Online
      </span>
      <nav className="flex flex-col gap-1">
        {socialList.map((socialItem, index) => (
          <Link
            key={socialItem.href}
            href={socialItem.href}
            className="group flex items-center justify-between rounded-lg p-2"
          >
            <span className="flex items-center">
              {socialItem.prefix}
              <span className="ml-2 font-medium">{socialItem.title}</span>
            </span>
            <Forward size={16} />
          </Link>
        ))}
      </nav>
      <Separator className="my-5" />
      <span className="px-2 text-xs mb-2 font-medium leading-relaxed text-gray-600">
        Open Source
      </span>
      <nav className="flex flex-col gap-1">
        {openSourceList.map((openItem, index) => (
          <Link
            key={openItem.href}
            href={openItem.href}
            className="group flex items-center justify-between rounded-lg p-2"
          >
            <span className="flex items-center">
              {openItem.prefix}
              <span className="ml-2 font-medium">{openItem.title}</span>
            </span>
            <Forward size={16} />
          </Link>
        ))}
      </nav>
    </aside>
  );
}
