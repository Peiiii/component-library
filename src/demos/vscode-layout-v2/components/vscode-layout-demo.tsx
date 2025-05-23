import { VSCodeLayout } from "@/components/layout/primitive";
import {
  ActivityBar,
  ActivityBarItem,
  ActivityBarGroup,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  EditorTabs,
  EditorTab,
  BottomPanel,
  BottomPanelTabs,
  BottomPanelTab,
  BottomPanelContent,
  FileExplorer,
  FileExplorerGroup,
  FileExplorerItem,
  FileExplorerFolder,
  Outline,
  OutlineGroup,
  OutlineItem,
} from "@/components/layout/primitive";
import { useResizablePanel } from "@/components/layout/hooks";
import {
  Code,
  FileText,
  Folder,
  GitBranch,
  LayoutGrid,
  Play,
  Search,
  Settings,
  Terminal,
  Users,
} from "lucide-react";
import * as React from "react";

export function VSCodeLayoutDemo() {
  const [activeLeftIcon, setActiveLeftIcon] = React.useState("explorer");
  const [activeRightIcon, setActiveRightIcon] = React.useState("outline");
  const [activeTab, setActiveTab] = React.useState("terminal");
  const [activeFile, setActiveFile] = React.useState("index.tsx");

  // 使用Hook简化左侧边栏内容区的状态管理
  const leftSidebar = useResizablePanel();

  // 使用Hook简化右侧边栏面板的状态管理
  const rightSidebar = useResizablePanel();

  // 使用Hook简化底部面板的状态管理
  const bottomPanel = useResizablePanel();

  // 左侧活动栏
  const activityBar = (
    <ActivityBar>
      <ActivityBarGroup>
        <ActivityBarItem
          active={activeLeftIcon === "explorer"}
          icon={<Folder className="h-5 w-5" />}
          onClick={() => setActiveLeftIcon("explorer")}
        />
        <ActivityBarItem
          active={activeLeftIcon === "search"}
          icon={<Search className="h-5 w-5" />}
          onClick={() => setActiveLeftIcon("search")}
        />
        <ActivityBarItem
          active={activeLeftIcon === "git"}
          icon={<GitBranch className="h-5 w-5" />}
          onClick={() => setActiveLeftIcon("git")}
        />
        <ActivityBarItem
          active={activeLeftIcon === "debug"}
          icon={<Play className="h-5 w-5" />}
          onClick={() => setActiveLeftIcon("debug")}
        />
        <ActivityBarItem
          active={activeLeftIcon === "extensions"}
          icon={<LayoutGrid className="h-5 w-5" />}
          onClick={() => setActiveLeftIcon("extensions")}
        />
      </ActivityBarGroup>
      <ActivityBarGroup className="mt-auto">
        <ActivityBarItem icon={<Users className="h-5 w-5" />} />
        <ActivityBarItem icon={<Settings className="h-5 w-5" />} />
      </ActivityBarGroup>
    </ActivityBar>
  );

  // 左侧边栏内容
  const leftSidebarContent = (
    <Sidebar position="left" onToggle={leftSidebar.toggle}>
      <SidebarHeader>
        <h3 className="font-semibold text-sm truncate">
          {activeLeftIcon === "explorer" && "资源管理器"}
          {activeLeftIcon === "search" && "搜索"}
          {activeLeftIcon === "git" && "源代码管理"}
          {activeLeftIcon === "debug" && "运行和调试"}
          {activeLeftIcon === "extensions" && "扩展"}
        </h3>
      </SidebarHeader>
      <SidebarContent>
        {activeLeftIcon === "explorer" && (
          <FileExplorer>
            <FileExplorerGroup title="项目">
              <FileExplorerFolder>src</FileExplorerFolder>
              <div className="ml-2">
                <FileExplorerFolder>components</FileExplorerFolder>
                <div className="ml-2">
                  <FileExplorerItem
                    active={activeFile === "button.tsx"}
                    onClick={() => setActiveFile("button.tsx")}
                  >
                    button.tsx
                  </FileExplorerItem>
                  <FileExplorerItem
                    active={activeFile === "index.tsx"}
                    onClick={() => setActiveFile("index.tsx")}
                  >
                    index.tsx
                  </FileExplorerItem>
                </div>
              </div>
            </FileExplorerGroup>
          </FileExplorer>
        )}
      </SidebarContent>
    </Sidebar>
  );

  // 主内容区
  const mainContent = (
    <div className="flex h-full flex-col">
      <EditorTabs>
        <EditorTab
          active={activeFile === "index.tsx"}
          icon={<FileText className="h-3 w-3" />}
          onClick={() => setActiveFile("index.tsx")}
        >
          index.tsx
        </EditorTab>
        <EditorTab
          active={activeFile === "button.tsx"}
          icon={<FileText className="h-3 w-3" />}
          onClick={() => setActiveFile("button.tsx")}
        >
          button.tsx
        </EditorTab>
      </EditorTabs>

      <div className="flex-1 overflow-auto p-4 bg-muted/10">
        {activeFile === "index.tsx" ? (
          <pre className="text-xs font-mono">
            {`import * as React from "react";
import { Button } from "./button";

export function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        My Application
      </h1>
      <Button>Click Me</Button>
    </div>
  );
}`}
          </pre>
        ) : (
          <pre className="text-xs font-mono">
            {`import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export function Button({
  children,
  variant = "default",
  size = "md",
}: ButtonProps) {
  return (
    <button
      className={\`
        rounded font-medium
        \${variant === "default" ? "bg-primary text-white" : ""}
        \${variant === "outline" ? "border border-primary" : ""}
        \${variant === "ghost" ? "bg-transparent hover:bg-muted" : ""}
        \${size === "sm" ? "text-xs px-2 py-1" : ""}
        \${size === "md" ? "text-sm px-3 py-1.5" : ""}
        \${size === "lg" ? "text-base px-4 py-2" : ""}
      \`}
    >
      {children}
    </button>
  );
}`}
          </pre>
        )}
      </div>
    </div>
  );

  // 底部面板内容
  const bottomPanelContent = (
    <BottomPanel>
      <BottomPanelTabs>
        <BottomPanelTab
          active={activeTab === "terminal"}
          icon={<Terminal className="h-3 w-3" />}
          onClick={() => setActiveTab("terminal")}
        >
          终端
        </BottomPanelTab>
        <BottomPanelTab
          active={activeTab === "output"}
          icon={<Code className="h-3 w-3" />}
          onClick={() => setActiveTab("output")}
        >
          输出
        </BottomPanelTab>
        <BottomPanelTab
          active={activeTab === "debug"}
          icon={<Play className="h-3 w-3" />}
          onClick={() => setActiveTab("debug")}
        >
          调试
        </BottomPanelTab>
      </BottomPanelTabs>
      <BottomPanelContent>
        {activeTab === "terminal" && (
          <pre className="text-xs font-mono text-muted-foreground p-2">
            {`$ npm start
> my-app@0.1.0 start
> react-scripts start

Starting the development server...

Compiled successfully!

You can now view my-app in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.1.5:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully`}
          </pre>
        )}
      </BottomPanelContent>
    </BottomPanel>
  );

  // 右侧边栏内容
  const rightSidebarContent = (
    <Sidebar position="right" onToggle={rightSidebar.toggle}>
      <SidebarHeader>
        <h3 className="font-semibold text-sm truncate">
          {activeRightIcon === "outline" && "大纲"}
          {activeRightIcon === "problems" && "问题"}
          {activeRightIcon === "docs" && "文档"}
          {activeRightIcon === "help" && "帮助"}
        </h3>
      </SidebarHeader>
      <SidebarContent>
        {activeRightIcon === "outline" && (
          <Outline>
            <OutlineGroup title="大纲">
              {activeFile === "index.tsx" ? (
                <OutlineItem itemType="function">App</OutlineItem>
              ) : (
                <>
                  <OutlineItem itemType="interface">ButtonProps</OutlineItem>
                  <OutlineItem itemType="function">Button</OutlineItem>
                </>
              )}
            </OutlineGroup>
          </Outline>
        )}
      </SidebarContent>
    </Sidebar>
  );

  return (
    <div className="h-[600px] w-full p-4">
      <VSCodeLayout
        activityBar={activityBar}
        leftSidebar={{
          content: leftSidebarContent,
          defaultSize: 20,
          minSize: 15,
          maxSize: 30,
          ref: leftSidebar.ref,
          onExpand: leftSidebar.handleExpand,
          onCollapse: leftSidebar.handleCollapse,
        }}
        mainContent={mainContent}
        bottomPanel={{
          content: bottomPanelContent,
          defaultSize: 30,
          minSize: 20,
          ref: bottomPanel.ref,
          onExpand: bottomPanel.handleExpand,
          onCollapse: bottomPanel.handleCollapse,
        }}
        rightSidebar={{
          content: rightSidebarContent,
          defaultSize: 20,
          minSize: 15,
          maxSize: 30,
          ref: rightSidebar.ref,
          onExpand: rightSidebar.handleExpand,
          onCollapse: rightSidebar.handleCollapse,
        }}
      />
    </div>
  );
} 