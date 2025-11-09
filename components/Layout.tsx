import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';
import MainIntroductionSection from './IntroSection';
import DerivativeSection from './DerivativeSection';
import IntegralSection from './IntegralSection';
import FundamentalTheoremSection from './FundamentalTheoremSection';
import EigenSection from './EigenSection';
import OrthogonalitySection from './OrthogonalitySection';
import ProjectionsSection from './ProjectionsSection';
import JacobianSection from './JacobianSection';
import HessianSection from './HessianSection';
import LagrangianSection from './LagrangianSection';
import EulerLagrangeSection from './EulerLagrangeSection';
import ExpectationSection from './ExpectationSection';
import VarianceSection from './VarianceSection';
import CovarianceSection from './CovarianceSection';
import ChangeOfVariableSection from './ChangeOfVariableSection';
import LawOfLargeNumbersSection from './LawOfLargeNumbersSection';
import CentralLimitTheoremSection from './CentralLimitTheoremSection';
import LikelihoodSection from './LikelihoodSection';
import MarginalLikelihoodSection from './MarginalLikelihoodSection';
import EntropySection from './EntropySection';
import SamplingSection from './SamplingSection';
import TangentSpaceSection from './TangentSpaceSection';
import RiemannianMetricSection from './RiemannianMetricSection';
import GeodesicsSection from './GeodesicsSection';
import ManifoldGradientSection from './ManifoldGradientSection';
import FunctionSpaceSection from './FunctionSpaceSection';
import FourierAnalysisSection from './FourierAnalysisSection';
import FunctionalDerivativeSection from './FunctionalDerivativeSection';
import OperatorTheorySection from './OperatorTheorySection';
import KLDivergenceSection from './KLDivergenceSection';
import CrossEntropySection from './CrossEntropySection';
import MutualInformationSection from './MutualInformationSection';
import OpenClosedSetsSection from './OpenClosedSetsSection';
import CompactnessSection from './CompactnessSection';
import ConnectednessSection from './ConnectednessSection';
import FixedPointTheoremSection from './FixedPointTheoremSection';

export type Tab = 
    | 'main-introduction' | 'derivatives' | 'integrals' | 'theorem'
    | 'eigenvectors' | 'orthogonality' | 'projections'
    | 'jacobian' | 'hessian' | 'lagrangian' | 'euler-lagrange'
    | 'expectation' | 'variance' | 'covariance' | 'change-of-variable' | 'lln' | 'clt'
    | 'likelihood' | 'marginal-likelihood' | 'sampling'
    | 'entropy' | 'kl-divergence' | 'cross-entropy' | 'mutual-information'
    | 'tangent-spaces' | 'riemannian-metric' | 'geodesics' | 'manifold-gradient'
    | 'function-spaces' | 'fourier-analysis' | 'functional-derivative' | 'operator-theory'
    | 'open-closed-sets' | 'compactness' | 'connectedness' | 'fixed-point-theorems';


const Layout: React.FC = () => {
    const [activeTab, setActiveTab] = useState<Tab>('main-introduction');
    const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

    const renderContent = () => {
        switch (activeTab) {
            case 'main-introduction':
                return <MainIntroductionSection />;
            case 'derivatives':
                return <DerivativeSection />;
            case 'integrals':
                return <IntegralSection />;
            case 'theorem':
                return <FundamentalTheoremSection />;
            case 'eigenvectors':
                return <EigenSection />;
            case 'orthogonality':
                return <OrthogonalitySection />;
            case 'projections':
                return <ProjectionsSection />;
            case 'jacobian':
                return <JacobianSection />;
            case 'hessian':
                return <HessianSection />;
            case 'lagrangian':
                return <LagrangianSection />;
            case 'euler-lagrange':
                return <EulerLagrangeSection />;
            case 'expectation':
                return <ExpectationSection />;
            case 'variance':
                return <VarianceSection />;
            case 'covariance':
                return <CovarianceSection />;
            case 'change-of-variable':
                return <ChangeOfVariableSection />;
            case 'lln':
                return <LawOfLargeNumbersSection />;
            case 'clt':
                return <CentralLimitTheoremSection />;
            case 'likelihood':
                return <LikelihoodSection />;
            case 'marginal-likelihood':
                return <MarginalLikelihoodSection />;
            case 'sampling':
                return <SamplingSection />;
            case 'entropy':
                return <EntropySection />;
            case 'kl-divergence':
                return <KLDivergenceSection />;
            case 'cross-entropy':
                return <CrossEntropySection />;
            case 'mutual-information':
                return <MutualInformationSection />;
            case 'tangent-spaces':
                return <TangentSpaceSection />;
            case 'riemannian-metric':
                return <RiemannianMetricSection />;
            case 'geodesics':
                return <GeodesicsSection />;
            case 'manifold-gradient':
                return <ManifoldGradientSection />;
            case 'function-spaces':
                return <FunctionSpaceSection />;
            case 'fourier-analysis':
                return <FourierAnalysisSection />;
            case 'functional-derivative':
                return <FunctionalDerivativeSection />;
            case 'operator-theory':
                return <OperatorTheorySection />;
            case 'open-closed-sets':
                return <OpenClosedSetsSection />;
            case 'compactness':
                return <CompactnessSection />;
            case 'connectedness':
                return <ConnectednessSection />;
            case 'fixed-point-theorems':
                return <FixedPointTheoremSection />;
            default:
                return <MainIntroductionSection />;
        }
    };

    return (
        <div className="bg-gray-900 text-gray-100 font-sans min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow max-w-8xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 h-full">
                    <Sidebar 
                        activeTab={activeTab} 
                        setActiveTab={setActiveTab} 
                        isCollapsed={isSidebarCollapsed}
                        setIsCollapsed={setIsSidebarCollapsed}
                    />
                    <main className="flex-1 min-w-0">
                        {renderContent()}
                    </main>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Layout;