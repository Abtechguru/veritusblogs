import { useRef, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
    Bold, Italic, Underline, Link as LinkIcon,
    List, ListOrdered, Image as ImageIcon,
    AlignLeft, AlignCenter, AlignRight,
    Type, Highlighter, Maximize2, Minimize2,
    ChevronDown, Eraser,
    Strikethrough, Code, Quote, Hash
} from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { cn } from '../../lib/utils';

interface RichTextEditorProps {
    content: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

export const RichTextEditor = ({ content, onChange, placeholder }: RichTextEditorProps) => {
    const editorRef = useRef<HTMLDivElement>(null);
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeStyles, setActiveStyles] = useState<string[]>([]);

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== content) {
            editorRef.current.innerHTML = content;
        }
    }, []);

    const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
        const newHtml = e.currentTarget.innerHTML;
        onChange(newHtml);
        updateActiveStyles();
    };

    const execCommand = (command: string, value: string | undefined = undefined) => {
        document.execCommand(command, false, value);
        editorRef.current?.focus();
        updateActiveStyles();
    };

    const updateActiveStyles = () => {
        const styles = [];
        if (document.queryCommandState('bold')) styles.push('bold');
        if (document.queryCommandState('italic')) styles.push('italic');
        if (document.queryCommandState('underline')) styles.push('underline');
        if (document.queryCommandState('strikeThrough')) styles.push('strikethrough');
        setActiveStyles(styles);
    };

    const addLink = () => {
        const url = prompt('Enter URL:');
        if (url) execCommand('createLink', url);
    };

    const addImage = () => {
        const url = prompt('Enter Image URL:');
        if (url) execCommand('insertImage', url);
    };

    const ToolbarButton = ({
        icon: Icon,
        onClick,
        active = false,
        label
    }: {
        icon: any,
        onClick: () => void,
        active?: boolean,
        label: string
    }) => (
        <TooltipProvider delayDuration={400}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => { e.preventDefault(); onClick(); }}
                        className={cn(
                            "h-9 w-9 p-0 rounded-lg transition-all duration-200",
                            active
                                ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-400"
                                : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800"
                        )}
                    >
                        <Icon className="h-4 w-4" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-900 text-white border-none text-[10px] font-black uppercase tracking-widest px-3 py-1.5">
                    {label}
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );

    return (
        <div className={cn(
            "transition-all duration-500 flex flex-col border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm",
            isFullScreen
                ? "fixed inset-0 z-[100] h-screen w-screen"
                : "rounded-2xl min-h-[300px] sm:min-h-[500px]"
        )}>
            {/* Toolbar Area */}
            <div className="flex flex-wrap items-center justify-between gap-1 p-2 sm:p-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex flex-wrap items-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <ToolbarButton
                            icon={Bold}
                            onClick={() => execCommand('bold')}
                            active={activeStyles.includes('bold')}
                            label="Bold (Ctrl+B)"
                        />
                        <ToolbarButton
                            icon={Italic}
                            onClick={() => execCommand('italic')}
                            active={activeStyles.includes('italic')}
                            label="Italic (Ctrl+I)"
                        />
                        <ToolbarButton
                            icon={Underline}
                            onClick={() => execCommand('underline')}
                            active={activeStyles.includes('underline')}
                            label="Underline (Ctrl+U)"
                        />
                        <ToolbarButton
                            icon={Strikethrough}
                            onClick={() => execCommand('strikeThrough')}
                            active={activeStyles.includes('strikethrough')}
                            label="Strikethrough"
                        />
                    </div>

                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <ToolbarButton icon={AlignLeft} onClick={() => execCommand('justifyLeft')} label="Align Left" />
                        <ToolbarButton icon={AlignCenter} onClick={() => execCommand('justifyCenter')} label="Align Center" />
                        <ToolbarButton icon={AlignRight} onClick={() => execCommand('justifyRight')} label="Align Right" />
                    </div>

                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <ToolbarButton icon={List} onClick={() => execCommand('insertUnorderedList')} label="Bullet List" />
                        <ToolbarButton icon={ListOrdered} onClick={() => execCommand('insertOrderedList')} label="Numbered List" />
                    </div>

                    <div className="flex items-center gap-0.5 bg-white dark:bg-slate-900 p-1 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800">
                        <ToolbarButton icon={LinkIcon} onClick={addLink} label="Insert Link" />
                        <ToolbarButton icon={ImageIcon} onClick={addImage} label="Insert Image" />
                        <ToolbarButton icon={Quote} onClick={() => execCommand('formatBlock', 'blockquote')} label="Blockquote" />
                        <ToolbarButton icon={Code} onClick={() => execCommand('formatBlock', 'pre')} label="Code Block" />
                    </div>

                    <div className="flex items-center gap-1 mr-2">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-9 px-3 gap-2 rounded-xl text-slate-500 hover:text-indigo-600 transition-colors">
                                    <Type className="h-4 w-4" />
                                    <ChevronDown className="h-3 w-3 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-48 p-2 border-none shadow-2xl rounded-2xl bg-white dark:bg-slate-900">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 px-2">Typography</p>
                                <div className="space-y-1">
                                    {[
                                        { label: 'Heading 1', cmd: 'formatBlock', val: 'H1', class: 'text-xl font-black' },
                                        { label: 'Heading 2', cmd: 'formatBlock', val: 'H2', class: 'text-lg font-bold' },
                                        { label: 'Heading 3', cmd: 'formatBlock', val: 'H3', class: 'text-md font-semibold' },
                                        { label: 'Paragraph', cmd: 'formatBlock', val: 'P', class: 'text-sm font-medium' },
                                    ].map(item => (
                                        <button
                                            key={item.label}
                                            onClick={() => execCommand(item.cmd, item.val)}
                                            className={cn(
                                                "w-full text-left px-3 py-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors",
                                                item.class
                                            )}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 rounded-xl text-slate-500 hover:text-indigo-600">
                                    <Highlighter className="h-4 w-4" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-56 p-3 border-none shadow-2xl rounded-2xl bg-white dark:bg-slate-900">
                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3 ml-1">Color Palette</p>
                                <div className="grid grid-cols-5 gap-2">
                                    {['#6366f1', '#10b981', '#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#06b6d4', '#475569', '#000000', '#ffffff'].map(color => (
                                        <button
                                            key={color}
                                            className="w-8 h-8 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm hover:scale-110 transition-transform"
                                            style={{ backgroundColor: color }}
                                            onClick={() => execCommand('foreColor', color)}
                                        />
                                    ))}
                                </div>
                            </PopoverContent>
                        </Popover>

                        <ToolbarButton icon={Eraser} onClick={() => execCommand('removeFormat')} label="Clear Formatting" />
                    </div>
                </div>

                <div className="flex items-center gap-1">
                    <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />
                    <ToolbarButton
                        icon={isFullScreen ? Minimize2 : Maximize2}
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        label={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                    />
                </div>
            </div>

            {/* Editor Body */}
            <div className={cn(
                "flex-1 bg-white dark:bg-slate-950 p-4 sm:p-8 lg:p-12 transition-all duration-500 overflow-y-auto custom-scrollbar",
                isFullScreen ? "max-w-4xl mx-auto shadow-2xl my-2 sm:my-8 rounded-2xl" : ""
            )}>
                <div
                    ref={editorRef}
                    className="min-h-full focus:outline-none prose prose-slate lg:prose-xl dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 selection:bg-indigo-100 dark:selection:bg-indigo-900/50"
                    contentEditable
                    onInput={handleInput}
                    onMouseUp={updateActiveStyles}
                    onKeyUp={updateActiveStyles}
                    dangerouslySetInnerHTML={{ __html: content }}
                    data-placeholder={placeholder}
                />
            </div>

            {/* Status Bar */}
            <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <Hash size={12} />
                        Words: {content.replace(/<[^>]*>/g, '').split(/\s+/).filter(Boolean).length}
                    </div>
                    <div className="h-1 w-1 rounded-full bg-slate-300" />
                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        Chars: {content.replace(/<[^>]*>/g, '').length}
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-widest animate-pulse">Auto-Sync Active</span>
                    <div className="h-2 w-2 rounded-full bg-indigo-500" />
                </div>
            </div>

            <style>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #94a3b8;
                    font-style: italic;
                    pointer-events: none;
                }
                .prose pre {
                    background-color: #0f172a;
                    color: #e2e8f0;
                    padding: 1rem;
                    border-radius: 0.75rem;
                    font-family: 'Fira Code', monospace;
                }
                .prose blockquote {
                    border-left-color: #6366f1;
                    font-style: italic;
                    color: #475569;
                    background-color: #f8fafc;
                    padding: 1rem 1.5rem;
                    border-radius: 0 1rem 1rem 0;
                }
                .dark .prose blockquote {
                    background-color: #0f172a;
                    color: #94a3b8;
                }
                .prose img {
                    border-radius: 1.5rem;
                    box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
                    margin: 2rem auto;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .dark .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #1e293b;
                }
            `}</style>
        </div>
    );
};
