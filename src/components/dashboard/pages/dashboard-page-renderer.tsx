import type { ReactNode } from "react";
import { OverviewPage } from "./OverviewPage";
import { AlertsPage } from "./AlertsPage";
import { TraderPassportPage } from "./TraderPassportPage";
import { WatchlistPage } from "./WatchlistPage";
import { AiAssistantPage } from "./AiAssistantPage";
import { JournalPage } from "./JournalPage";
import { SavedAnalysisPage } from "./SavedAnalysisPage";
import { ChartStrategyAiPage } from "./ChartStrategyAiPage";
import { CalculatorsPage } from "./CalculatorsPage";
import { AccountAuditorPage } from "./AccountAuditorPage";
import { RiskPlannerPage } from "./RiskPlannerPage";
import { PreTradeChecklistPage } from "./PreTradeChecklistPage";
import { BrokerComparisonPage } from "./BrokerComparisonPage";
import { PropFirmComparisonPage } from "./PropFirmComparisonPage";
import { TradingNewsAiPage } from "./TradingNewsAiPage";
import { EconomicCalendarPage } from "./EconomicCalendarPage";
import { WhyMarketMovingPage } from "./WhyMarketMovingPage";
import { CentralBankIntelligencePage } from "./CentralBankIntelligencePage";
import { NewsImpactAnalyzerPage } from "./NewsImpactAnalyzerPage";
import { DailyMarketBriefPage } from "./DailyMarketBriefPage";
import { CreditsUsagePage } from "./CreditsUsagePage";
import { SubscriptionsPage } from "./SubscriptionsPage";
import { PollsVotingPage } from "./PollsVotingPage";
import { HelpResourcesPage } from "./HelpResourcesPage";

export type DashboardPageKey =
  | "Alerts"
  | "Overview" | "Trader Passport" | "Watchlist" | "AI assistant" | "Journal" | "Saved analysis" | "Chart & Strategy AI" | "Calculators" | "Account Auditor" | "Risk Planner" | "Pre-Trade Checklist" | "Broker comparison" | "Prop firm comparison" | "Trading News AI" | "Economic Calendar" | "Why Market Moving?" | "Central Bank Intelligence" | "News Impact Analyzer" | "Daily Market Brief" | "Credits & Usage" | "Subscriptions" | "Polls & Voting" | "Help & resources";

export function DashboardPageRenderer({
  page,
  children,
}: {
  page: string;
  children: ReactNode;
}) {
  switch (page) {
    case "Alerts": return <AlertsPage>{children}</AlertsPage>;
    case "Overview": return <OverviewPage>{children}</OverviewPage>;
    case "Trader Passport": return <TraderPassportPage>{children}</TraderPassportPage>;
    case "Watchlist": return <WatchlistPage>{children}</WatchlistPage>;
    case "AI assistant": return <AiAssistantPage>{children}</AiAssistantPage>;
    case "Journal": return <JournalPage>{children}</JournalPage>;
    case "Saved analysis": return <SavedAnalysisPage>{children}</SavedAnalysisPage>;
    case "Chart & Strategy AI": return <ChartStrategyAiPage>{children}</ChartStrategyAiPage>;
    case "Calculators": return <CalculatorsPage>{children}</CalculatorsPage>;
    case "Account Auditor": return <AccountAuditorPage>{children}</AccountAuditorPage>;
    case "Risk Planner": return <RiskPlannerPage>{children}</RiskPlannerPage>;
    case "Pre-Trade Checklist": return <PreTradeChecklistPage>{children}</PreTradeChecklistPage>;
    case "Broker comparison": return <BrokerComparisonPage>{children}</BrokerComparisonPage>;
    case "Prop firm comparison": return <PropFirmComparisonPage>{children}</PropFirmComparisonPage>;
    case "Trading News AI": return <TradingNewsAiPage>{children}</TradingNewsAiPage>;
    case "Economic Calendar": return <EconomicCalendarPage>{children}</EconomicCalendarPage>;
    case "Why Market Moving?": return <WhyMarketMovingPage>{children}</WhyMarketMovingPage>;
    case "Central Bank Intelligence": return <CentralBankIntelligencePage>{children}</CentralBankIntelligencePage>;
    case "News Impact Analyzer": return <NewsImpactAnalyzerPage>{children}</NewsImpactAnalyzerPage>;
    case "Daily Market Brief": return <DailyMarketBriefPage>{children}</DailyMarketBriefPage>;
    case "Credits & Usage": return <CreditsUsagePage>{children}</CreditsUsagePage>;
    case "Subscriptions": return <SubscriptionsPage>{children}</SubscriptionsPage>;
    case "Polls & Voting": return <PollsVotingPage>{children}</PollsVotingPage>;
    case "Help & resources":
    case "Help": return <HelpResourcesPage>{children}</HelpResourcesPage>;
    default:
      return <OverviewPage>{children}</OverviewPage>;
  }
}
