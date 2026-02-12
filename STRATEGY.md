# Sling Money — Full Strategic Context & Research

This document contains all verified research data gathered during competitive intelligence. Use this as the source of truth for any additions to the dashboard.

## Company Profile

### Founding & Leadership
- **Founded**: 2022 by Mike Hudack (CEO) and Simon Amor (Product Designer)
- **Origin**: Met while building Monzo Bank (UK neobank). Hudack transferred $10K USDC on Solana UK→SF, saw terrible UX but instant/free transfer, decided to build "global Venmo"
- **Parent company**: Avian Labs (Delaware corp + Amsterdam subsidiary)

### Mike Hudack Background
- High school dropout, self-taught programmer
- Founded Blip.tv (2005-2011, acquired by Disney)
- Facebook Director of Product (2012-2016): Identity, Sharing, Ads post-IPO
- Deliveroo CPTO (2016-2019)
- Monzo CPO (2020-2022)
- Active angel investor, board member VidIQ

### Funding
- Seed (2023): $5M led by Ribbit Capital
- Series A (Aug 2024): $15M led by Union Square Ventures, Ribbit, Slow Ventures, Lipbit Capital
- Total raised: $20M
- Estimated valuation: $60M-$100M (not disclosed)
- Estimated burn: $300K-$500K/month
- Runway: Through mid-late 2026

### Team (as of late 2025)
- ~40 employees (up from 23 in Nov 2024; 74% growth)
- 20% compliance/financial crime, 55% product/engineering, 10% marketing, 15% ops/partnerships/finance
- Offices: London, Amsterdam, Hoboken NJ + remote (Texas, Colombia, Spain, Poland)

### Key Milestones
- Mid-2023: Beta launch, 29 countries
- Nov 2024: US launch (all major banks, 75+ countries)
- Dec 2024: Stablecoin bridge (external wallet integration)
- Mar 2025: EURC integration for Europe
- Apr 2025: MiCA license (Netherlands AFM)
- May 2025: Virtual USD/EUR Accounts via Bridge (Stripe)
- Late 2025: Mexico launch, 145+ countries live
- Dec 2025: UK FCA crypto-asset registration

## Product Details

### Core Product
- Self-custodial wallet on Solana blockchain (user holds private key)
- Stablecoins: USDP (Paxos), USDC (Circle), EURC (Circle)
- P2P transfers by name search (no IBAN/routing needed)
- Sling Links: Send to non-users via shareable link
- 145+ countries, 40+ currencies
- Virtual USD/EUR Accounts (receive ACH/wire/SEPA, auto-convert to stablecoin)
- Virtual Visa debit card (zero FX fees)

### Technology Stack
- Blockchain: Solana (sub-cent fees, high throughput)
- Virtual Accounts: Bridge (acquired by Stripe for $1.1B)
- US rails: RTP, FedNow, Visa Direct, MC Send, ACH
- EU rails: SEPA, SEPA Instant
- Bank connectivity: Plaid (EEA + UK)
- Security: ISO 27001, biometric KYC

### Pricing
- P2P transfers: FREE
- Sling Links: FREE
- Loading funds: FREE (debit card, bank, SEPA, ACH)
- Withdrawals: FREE (instant via RTP/FedNow/Visa Direct/MC Send)
- FX: Mid-market rate, no markup
- Virtual Account deposits: 0.1% fee
- Virtual Visa card: Zero FX fees

### Revenue Status
- CEO Hudack admitted (Nov 2024 Substack): "We promised not to build a gross margin negative product... but here we are."
- Currently running free as growth strategy
- Potential future revenue: Visa card interchange, 0.1% Virtual Account fee, FX spreads, premium tier

## CEO Quotes (use for strategic alignment)

- "Start where Venmo isn't" — international corridors first
- "Follow WhatsApp's growth model" — critical mass abroad, then domestic
- "Sling Links are inherently viral" — every non-user payment = acquisition
- "We're going to go straight for it [free global transfers]... 10% chance at making money transfer entirely free for everyone, and that's just too big a prize to ignore"
- "We're a fairly small team, and we plan to stay pretty small"

## US↔Mexico Corridor Data

### Market Size
- $64.7B total remittances to Mexico in 2024 (record year, BBVA Research / Banxico)
- US sent $62.5B (96.6% of total)
- 151M individual transactions in Jan-Nov 2024
- Average transaction: $395
- 99% electronic transfers
- 163M total transactions estimated for full year 2024

### 2025 Trends (IMPORTANT — recent shift)
- Q2 2025: Remittances to Mexico fell 11% YoY to $15.3B (FXC Intel)
- June 2025: 16.2% YoY decline — steepest monthly drop since 2012
- Average transaction fell to $393 (4th consecutive quarterly decline)
- Analysts attribute to: Trump deportation fears, weakening migrant labor market, employer reluctance
- New 1% remittance tax in 2025 "One Big Beautiful Bill" Act
- Despite decline, corridor remains world's largest bilateral remittance flow

### State-Level Breakdown (2024, Banxico data)
| State | Remittances | Mexican-Origin Pop |
|-------|-----------|-------------------|
| California | $20.4B (33%) | 14.2M |
| Texas | $9.0B (15%) | 10.8M |
| Illinois | $3.8B (6%) | 2.2M |
| Arizona | $2.9B (5%) | 2.1M |
| Georgia | $2.5B (4%) | 1.1M |
| New York | $2.3B (4%) | 1.3M |
| Colorado | $2.1B (3%) | 1.2M |
| Nevada | $1.8B (3%) | 0.8M |

### Demographics
- 38M+ Mexican-origin population in US (Census 2024)
- 68% of Mexican immigrants send money home
- Average sender remits ~$5,800/year
- 60% live in CA or TX
- Average time in US: 22+ years (2023)
- 49% have spent 20+ years in US

### Competitor Costs (World Bank Q3 2024)
- Average cost to send $500 US→Mexico: 3% ($15.13)
- Sling Money: $0
- Wise: ~$4.80 (0.96%)
- Remitly: ~$3.99
- Western Union: ~$7.50
- Bank wire: ~$35

### Key Competitors in Corridor
- Remitly: 23% market share in US→LAC (largest, went public)
- Western Union: Still dominant globally but losing digital share
- Wise: Growing, ~1% fees
- Viamericas: 10% market share, doubled in 5 years
- Xoom (PayPal): Pioneer in internet-based, now standalone app
- Intermex: Went public, expanding beyond Mexico/Guatemala
- Bitso: Crypto-native, processed $4.3B US→MX in 2023

## Sling Vulnerabilities (from app reviews)

### Onboarding/KYC Issues
- "It just freezes on verifying identity... gave them my social and selfies"
- "Rejected my account and cannot tell me the reason"
- "18-24 hours stuck mid-transaction"
- "We are a small team doing our best to get through every case"
- Multiple 1-star reviews calling it "Scam" due to unexplained rejections

### Brand Trust
- No US brand recognition in target demographic
- Asks for SSN + facial selfie from unfamiliar app
- No physical presence in communities
- No visible Spanish-language marketing or support
- Competitor incumbents (WU, Remitly) have decades of trust

### Feature Gaps
- No business accounts
- No physical debit card (only virtual)
- No credit card loading
- No cash deposits
- No savings/yield features
- Mobile-only (no web/desktop)

## City-Level Research

### Los Angeles
- Boyle Heights: 94% Latino, 85K+ residents, El Mercadito marketplace
- East LA: Whittier Blvd corridor, Cesar Chavez Ave
- South LA (Florence-Firestone, Huntington Park): Growing Mexican-American pop
- Key partners: El Mercadito, Our Lady of Guadalupe Church, Plaza de la Raza, Mexican Consulate LA, LA Plaza de Cultura y Artes
- Events: Fiestas Patrias (Sept), Dia de los Muertos (Nov), Cinco de Mayo East LA

### Houston
- Second Ward (Segundo Barrio): Houston's oldest Mexican-American neighborhood
- Magnolia Park: Established 1890, "Little Mexico" by 1920s
- Key partners: BakerRipley (70 locations), AAMA, Our Lady of Guadalupe Church (est. 1912), Talento Bilingüe de Houston
- East End: Home to some of city's best Mexican restaurants and bakeries
- Navigation Blvd: Commercial spine of Second Ward

### Chicago
- Little Village (La Villita): 75K+ residents, 77% Mexican-American
- 26th Street: "Mexican Magnificent Mile" — $900M/year in sales, 500+ businesses in 2 miles, 2nd highest-grossing shopping district after Magnificent Mile
- Pilsen: Historic Mexican-American neighborhood, National Museum of Mexican Art
- Key partners: Enlace Chicago, Little Village Chamber of Commerce, Latinos Progresando, Mexican Consulate Chicago
- Events: 26th St Mexican Independence Day Parade (54th annual, Sept 15), Fiesta del Sol (July), Villapalooza

### Dallas–Fort Worth
- Oak Cliff: Primary Mexican-American neighborhood, Jefferson Blvd commercial spine
- Pleasant Grove: 75%+ Hispanic, working-class
- Fort Worth Northside: Historic Mexican-American community, North Main St corridor
- Key partners: Oak Cliff Chamber of Commerce, Mexican Consulate Dallas, Catholic Diocese

### Phoenix
- Maryvale: 77% Hispanic, 200K+ residents, 35th Ave + Indian School Rd corridors
- South Phoenix / Laveen: Historic Latino community
- Key partners: Chicanos Por La Causa, Mexican Consulate Phoenix, Valle del Sol
- Border-adjacent: Many residents send to Sonora weekly/biweekly (higher frequency)
