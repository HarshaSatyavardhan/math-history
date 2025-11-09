import React, { useState, useEffect } from 'react';
import { Tab } from './Layout';

interface SidebarProps {
    activeTab: Tab;
    setActiveTab: (tab: Tab) => void;
    isCollapsed: boolean;
    setIsCollapsed: (isCollapsed: boolean) => void;
}

const NavItem: React.FC<{ tabId: Tab; activeTab: Tab; setActiveTab: (tab: Tab) => void; icon: React.ReactElement; isCollapsed: boolean; children: React.ReactNode; }> = ({ tabId, activeTab, setActiveTab, icon, children, isCollapsed }) => {
    const isActive = activeTab === tabId;
    return (
        <li>
            <button
                onClick={() => setActiveTab(tabId)}
                className={`w-full flex items-center text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md scale-[1.02]'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                }`}
                title={isCollapsed ? String(children) : ""}
            >
                <span className="w-5 h-5 flex-shrink-0">{icon}</span>
                <span className={`ml-3 flex-1 whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                    {children}
                </span>
            </button>
        </li>
    );
};

const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode; initialOpen?: boolean; isCollapsed: boolean; }> = ({ title, children, initialOpen = false, isCollapsed }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    useEffect(() => {
        if (isCollapsed) setIsOpen(false);
    }, [isCollapsed]);

    return (
        <div>
            <button
                onClick={() => setIsOpen(!isOpen)}
                disabled={isCollapsed}
                className={`w-full flex justify-between items-center px-3 py-2 text-left text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 rounded-lg transition-all duration-200 ${!isCollapsed ? 'hover:text-gray-700 dark:hover:text-gray-300' : 'cursor-default'}`}
            >
                <span className={`transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>{title}</span>
                <svg className={`w-4 h-4 transform transition-all duration-200 ${isOpen && !isCollapsed ? 'rotate-90' : 'rotate-0'} ${isCollapsed ? 'opacity-0' : 'opacity-100'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
            </button>
            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${isOpen && !isCollapsed ? 'max-h-[1000px]' : 'max-h-0'}`}>
                <ul className="pl-4 border-l-2 border-gray-200 dark:border-gray-700 ml-3 space-y-1 mt-1 pt-1">
                    {children}
                </ul>
            </div>
        </div>
    );
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, isCollapsed, setIsCollapsed }) => {
    const navItemProps = { activeTab, setActiveTab, isCollapsed };

    return (
        <aside className={`lg:sticky lg:top-20 lg:self-start flex-shrink-0 flex flex-col bg-white dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-3 rounded-xl shadow-sm transition-all duration-300 ${isCollapsed ? 'lg:w-20' : 'lg:w-72'}`}>
            <nav className="flex-grow space-y-2">
                <ul className="space-y-1">
                    <NavItem tabId="main-introduction" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>}>Introduction</NavItem>
                </ul>
                 <CollapsibleSection title="Calculus Foundations" initialOpen={true} isCollapsed={isCollapsed}>
                    <NavItem tabId="derivatives" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-3.94-3.94m3.94 3.94l-3.94 3.94" /></svg>}>Derivatives</NavItem>
                    <NavItem tabId="integrals" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15M9 12l3 3m0 0l3-3m-3 3V2.25" /></svg>}>Integrals</NavItem>
                    <NavItem tabId="theorem" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12a8.954 8.954 0 011.866-5.492l.45-1.061a2.25 2.25 0 014.295.323l.162.38a8.954 8.954 0 011.866 5.492m0 0a8.954 8.954 0 00-1.866 5.492l-.45 1.06a2.25 2.25 0 00-4.295-.323l-.162-.38a8.954 8.954 0 00-1.866-5.492m10.233 0a8.954 8.954 0 01-1.866 5.492l-.45 1.06a2.25 2.25 0 01-4.295-.323l-.162-.38a8.954 8.954 0 01-1.866-5.492m0 0a8.954 8.954 0 001.866-5.492l.45-1.062a2.25 2.25 0 00-4.295.323l-.162.38a8.954 8.954 0 001.866 5.492" /></svg>}>Fundamental Theorem</NavItem>
                </CollapsibleSection>

                <CollapsibleSection title="Calculus: Advanced" isCollapsed={isCollapsed}>
                     <NavItem tabId="jacobian" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z" /></svg>}>Jacobian</NavItem>
                     <NavItem tabId="hessian" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>}>Hessian</NavItem>
                     <NavItem tabId="lagrangian" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0l-3-3m3 3l3-3m-8.25 6a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" /></svg>}>Lagrangian Multipliers</NavItem>
                     <NavItem tabId="euler-lagrange" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5m.75-9l3-3 3 3m-6 0v1.5" /></svg>}>Euler-Lagrange</NavItem>
                </CollapsibleSection>

                <CollapsibleSection title="Linear Algebra" isCollapsed={isCollapsed}>
                    <NavItem tabId="eigenvectors" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5" /></svg>}>Eigenvectors</NavItem>
                    <NavItem tabId="orthogonality" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M90 12.75l.243.243a4.5 4.5 0 010 6.364l-4.243 4.243a4.5 4.5 0 01-6.364 0l-4.243-4.243a4.5 4.5 0 010-6.364l.243-.243L15 3.75l4.243 4.243L15 12.243z" transform="scale(1.5) translate(-7 -4)" /></svg>}>Orthogonality</NavItem>
                    <NavItem tabId="projections" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>}>Projections</NavItem>
                </CollapsibleSection>

                <CollapsibleSection title="Probability & Stats" isCollapsed={isCollapsed}>
                    <NavItem tabId="expectation" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.228a4.5 4.5 0 00-1.875-1.875 4.5 4.5 0 10-6.364 6.364 4.5 4.5 0 006.364-6.364l1.875-1.875 1.875 1.875z" /></svg>}>Expectation</NavItem>
                    <NavItem tabId="variance" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v1.5M3.75 19.5v1.5M8.25 3v1.5M8.25 19.5v1.5M12 3v1.5M12 19.5v1.5M15.75 3v1.5M15.75 19.5v1.5M20.25 3v1.5M20.25 19.5v1.5M12 5.25a7.5 7.5 0 00-7.5 7.5 7.5 7.5 0 007.5 7.5 7.5 7.5 0 007.5-7.5 7.5 7.5 0 00-7.5-7.5z" /></svg>}>Variance</NavItem>
                    <NavItem tabId="covariance" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5v15m0 0l-3.75-3.75M13.5 19.5l3.75-3.75" /></svg>}>Covariance</NavItem>
                    <NavItem tabId="change-of-variable" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0011.667 0l3.181-3.183m-11.667-11.667l3.181 3.183a8.25 8.25 0 0111.667 0l3.181-3.183m-11.667 11.667v-4.992" /></svg>}>Change of Variables</NavItem>
                    <NavItem tabId="lln" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m-15 0l6.75-6.75M4.5 12l6.75 6.75" /></svg>}>Law of Large Numbers</NavItem>
                    <NavItem tabId="clt" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" /></svg>}>Central Limit Theorem</NavItem>
                    <NavItem tabId="likelihood" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l3 3m0 0l3-3m-3 3v-7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}>Likelihood</NavItem>
                    <NavItem tabId="marginal-likelihood" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 4.006 4.006 0 00-3.662-.138 4.006 4.006 0 00-3.7 3.7 4.006 4.006 0 00-.138 3.662v1.5a2.25 2.25 0 002.25 2.25h1.5a2.25 2.25 0 002.25-2.25v-1.5c0-1.232.046-2.453.138-3.662a4.006 4.006 0 013.7-3.7 4.006 4.006 0 013.662.138 4.006 4.006 0 013.7 3.7c.091 1.21.138 2.43.138 3.662v1.5a2.25 2.25 0 01-2.25 2.25h-1.5a2.25 2.25 0 01-2.25-2.25v-1.5z" /></svg>}>Marginal Likelihood</NavItem>
                    <NavItem tabId="sampling" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v1.5M17.25 3v1.5M3 8.25h18M3 12.75h18M3 17.25h18M6.75 21v-1.5M17.25 21v-1.5" /></svg>}>Sampling (Monte Carlo)</NavItem>
                </CollapsibleSection>

                <CollapsibleSection title="Information Theory" isCollapsed={isCollapsed}>
                    <NavItem tabId="entropy" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 3h9.75m-9.75 3h9.75m4.5-15H21a.75.75 0 01.75.75v12.5a.75.75 0 01-.75.75h-15a.75.75 0 01-.75-.75V3.75A.75.75 0 015.25 3z" /></svg>}>Entropy</NavItem>
                    <NavItem tabId="kl-divergence" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zM12 2.25a8.954 8.954 0 012.366.412m-4.732 0A8.954 8.954 0 0112 2.25z" /></svg>}>KL Divergence</NavItem>
                    <NavItem tabId="cross-entropy" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m-15 0l15 15" /></svg>}>Cross-Entropy</NavItem>
                    <NavItem tabId="mutual-information" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" /></svg>}>Mutual Information</NavItem>
                </CollapsibleSection>

                 <CollapsibleSection title="Topology & Analysis" isCollapsed={isCollapsed}>
                    <NavItem tabId="open-closed-sets" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-9l2.25 1.313M9 10.5l2.25 1.313m0 0l2.25-1.313m-4.5 0l2.25-1.313m-2.25 0l-2.25 1.313m16.5 0l-2.25-1.313M19.5 10.5l-2.25 1.313m0 0l-2.25-1.313m4.5 0l-2.25 1.313M19.5 10.5l2.25-1.313" /></svg>}>Open & Closed Sets</NavItem>
                    <NavItem tabId="compactness" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9M20.25 20.25h-4.5m4.5 0v-4.5m0 4.5L15 15" /></svg>}>Compactness</NavItem>
                    <NavItem tabId="connectedness" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>}>Connectedness</NavItem>
                    <NavItem tabId="fixed-point-theorems" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" /></svg>}>Fixed-Point Theorems</NavItem>
                </CollapsibleSection>
                
                 <CollapsibleSection title="Differential Geometry" isCollapsed={isCollapsed}>
                    <NavItem tabId="tangent-spaces" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c.504 0 1.002-.023 1.49-.067M12 21c-.504 0-1.002-.023-1.49-.067M3.285 14.25a9.004 9.004 0 010-4.5m17.43 4.5a9.004 9.004 0 000-4.5" /></svg>}>Tangent Spaces</NavItem>
                    <NavItem tabId="riemannian-metric" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3.75l3.75 3.75-3.75 3.75M17.25 3.75l-3.75 3.75 3.75 3.75" /></svg>}>Riemannian Metric</NavItem>
                    <NavItem tabId="geodesics" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.21 5.77a10.466 10.466 0 0117.58 0M3.21 18.23a10.466 10.466 0 0017.58 0" /></svg>}>Geodesics</NavItem>
                    <NavItem tabId="manifold-gradient" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75" /></svg>}>Manifold Gradient</NavItem>
                </CollapsibleSection>
                
                <CollapsibleSection title="Functional Analysis" isCollapsed={isCollapsed}>
                    <NavItem tabId="function-spaces" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>}>Function Spaces</NavItem>
                    <NavItem tabId="fourier-analysis" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" /></svg>}>Fourier Analysis</NavItem>
                    <NavItem tabId="functional-derivative" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>}>Functional Derivative</NavItem>
                    <NavItem tabId="operator-theory" {...navItemProps} icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" /></svg>}>Operator Theory</NavItem>
                </CollapsibleSection>

            </nav>
            <div className="mt-auto border-t border-gray-200 dark:border-gray-700 pt-3">
                <button
                    onClick={() => setIsCollapsed(!isCollapsed)}
                    className="w-full flex items-center text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white"
                >
                    <span className="w-5 h-5 flex-shrink-0">
                       {isCollapsed ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5" /></svg>
                       ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" /></svg>
                       )}
                    </span>
                    <span className={`ml-3 flex-1 whitespace-nowrap transition-opacity duration-200 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                        {isCollapsed ? 'Expand' : 'Collapse'}
                    </span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;