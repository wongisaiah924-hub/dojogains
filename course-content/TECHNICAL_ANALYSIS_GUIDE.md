# Technical Analysis for Day Trading - Expert Reference Guide

*Comprehensive knowledge base for Dojo Gains course content*

---

## Table of Contents
1. [Foundations](#foundations)
2. [Candlestick Patterns](#candlestick-patterns)
3. [Chart Patterns](#chart-patterns)
4. [Technical Indicators](#technical-indicators)
5. [Support & Resistance](#support--resistance)
6. [Market Structure](#market-structure)
7. [Volume Analysis](#volume-analysis)
8. [Risk Management](#risk-management)
9. [Trading Strategies](#trading-strategies)
10. [Psychology](#psychology)

---

## Foundations

### Core Assumptions of Technical Analysis
1. **Price discounts everything** - All known information is already reflected in the price
2. **Price moves in trends** - Markets don't move randomly; they follow identifiable patterns
3. **History tends to repeat** - Market psychology creates recurring patterns

### Types of Analysis
- **Technical Analysis**: Study of price/volume data to predict future movements
- **Fundamental Analysis**: Study of financial statements, earnings, economic data
- **Sentiment Analysis**: Gauging market mood through indicators, surveys, social media

### Timeframes
| Timeframe | Candle Period | Best For |
|-----------|---------------|----------|
| 1-minute | 1 min | Scalping |
| 5-minute | 5 min | Day trading |
| 15-minute | 15 min | Day trading |
| 1-hour | 1 hour | Swing trading |
| 4-hour | 4 hours | Swing trading |
| Daily | 1 day | Position trading |
| Weekly | 1 week | Long-term investing |

**Rule**: Higher timeframes = more reliable signals (less noise)

---

## Candlestick Patterns

### Single Candle Patterns

#### Doji
- **Appearance**: Open ≈ Close (cross shape)
- **Meaning**: Indecision, potential reversal
- **Types**: Standard, Gravestone, Dragonfly, Long-legged
- **Best at**: Key support/resistance levels

#### Hammer / Hanging Man
- **Appearance**: Small body at top, long lower wick (2x+ body)
- **Hammer**: Found at bottom of downtrend = BULLISH reversal
- **Hanging Man**: Found at top of uptrend = BEARISH reversal

#### Shooting Star / Inverted Hammer
- **Appearance**: Small body at bottom, long upper wick
- **Shooting Star**: Top of uptrend = BEARISH reversal
- **Inverted Hammer**: Bottom of downtrend = BULLISH reversal

#### Marubozu
- **Appearance**: Full body, no wicks
- **Meaning**: Strong conviction, momentum in direction of candle
- **Bullish Marubozu**: Strong buying pressure
- **Bearish Marubozu**: Strong selling pressure

#### Spinning Top
- **Appearance**: Small body, equal upper/lower wicks
- **Meaning**: Indecision, battle between buyers and sellers

### Multi-Candle Patterns

#### Engulfing Patterns
- **Bullish Engulfing**: Green candle completely engulfs prior red candle
  - Found at bottom of downtrend
  - Signals bullish reversal
- **Bearish Engulfing**: Red candle completely engulfs prior green candle
  - Found at top of uptrend
  - Signals bearish reversal

#### Morning Star / Evening Star (3-candle)
- **Morning Star** (Bullish):
  1. Large red candle
  2. Small-bodied candle (gap down)
  3. Large green candle closing into first candle's body
- **Evening Star** (Bearish): Opposite of morning star

#### Three White Soldiers / Three Black Crows
- **Three White Soldiers**: Three consecutive large green candles = strong bullish
- **Three Black Crows**: Three consecutive large red candles = strong bearish

#### Inside Bar
- **Appearance**: Second candle's range entirely within first candle
- **Meaning**: Consolidation, potential breakout
- **Trade**: Enter on breakout of the mother bar's range

#### Tweezer Tops/Bottoms
- **Appearance**: Two candles with equal highs (tops) or lows (bottoms)
- **Meaning**: Rejection at that price level

---

## Chart Patterns

### Reversal Patterns

#### Head and Shoulders
- **Structure**: Three peaks - middle peak (head) higher than two shoulders
- **Neckline**: Support connecting the two troughs
- **Signal**: Bearish reversal when price breaks below neckline
- **Target**: Distance from head to neckline, projected down from breakout
- **Inverse H&S**: Bullish reversal at market bottoms

#### Double Top / Double Bottom
- **Double Top** (M pattern):
  - Two peaks at approximately same level
  - Bearish reversal signal
  - Enter short on break below the middle trough
- **Double Bottom** (W pattern):
  - Two troughs at approximately same level
  - Bullish reversal signal
  - Enter long on break above the middle peak

#### Triple Top / Triple Bottom
- Similar to double, but with three peaks/troughs
- Stronger signal due to more tests of level

#### Rounding Bottom (Saucer)
- **Appearance**: Gradual U-shaped bottom
- **Meaning**: Slow transition from bearish to bullish sentiment
- **Timeframe**: Usually longer-term pattern

### Continuation Patterns

#### Flags and Pennants
- **Flag**: Rectangle pattern that slopes against the trend
  - Bull flag: Downward sloping channel after uptrend
  - Bear flag: Upward sloping channel after downtrend
- **Pennant**: Small symmetrical triangle after strong move
- **Trade**: Enter on breakout in direction of prior trend
- **Target**: Height of the flagpole

#### Triangles
- **Ascending Triangle** (Bullish):
  - Flat resistance, rising support
  - Usually breaks upward
- **Descending Triangle** (Bearish):
  - Flat support, falling resistance
  - Usually breaks downward
- **Symmetrical Triangle** (Neutral):
  - Converging trendlines
  - Can break either direction

#### Wedges
- **Rising Wedge** (Bearish):
  - Both trendlines slope upward
  - Support steeper than resistance
  - Usually breaks downward
- **Falling Wedge** (Bullish):
  - Both trendlines slope downward
  - Resistance steeper than support
  - Usually breaks upward

#### Cup and Handle
- **Structure**: Rounded bottom (cup) followed by small pullback (handle)
- **Signal**: Bullish continuation
- **Entry**: Break above handle resistance
- **Target**: Depth of cup projected from breakout

---

## Technical Indicators

### Trend Indicators

#### Moving Averages
- **SMA (Simple Moving Average)**: Equal weight to all periods
- **EMA (Exponential Moving Average)**: More weight to recent prices
- **Common Periods**: 9, 20, 50, 100, 200
- **Uses**:
  - Trend direction (price above MA = bullish)
  - Dynamic support/resistance
  - Crossovers (Golden Cross: 50 crosses above 200 = bullish)
  - Death Cross: 50 crosses below 200 = bearish

#### VWAP (Volume Weighted Average Price)
- **Formula**: Cumulative(Price × Volume) / Cumulative(Volume)
- **Resets daily** - intraday indicator only
- **Uses**:
  - Institutional benchmark
  - Fair value reference
  - Support/resistance
- **Trading**:
  - Price > VWAP = bullish bias
  - Price < VWAP = bearish bias
  - Mean reversion strategies

### Momentum Indicators

#### RSI (Relative Strength Index)
- **Range**: 0-100
- **Overbought**: >70 (potential sell)
- **Oversold**: <30 (potential buy)
- **Divergence**: RSI moves opposite to price = potential reversal
- **Period**: Typically 14

#### MACD (Moving Average Convergence Divergence)
- **Components**:
  - MACD Line: 12 EMA - 26 EMA
  - Signal Line: 9 EMA of MACD Line
  - Histogram: MACD Line - Signal Line
- **Signals**:
  - MACD crosses above signal = bullish
  - MACD crosses below signal = bearish
  - Histogram growing = momentum increasing
  - Divergence from price = potential reversal

#### Stochastic Oscillator
- **Range**: 0-100
- **Components**: %K (fast) and %D (slow)
- **Overbought**: >80
- **Oversold**: <20
- **Signals**: %K crossing %D, divergences

### Volatility Indicators

#### Bollinger Bands
- **Components**:
  - Middle: 20 SMA
  - Upper: 20 SMA + (2 × Standard Deviation)
  - Lower: 20 SMA - (2 × Standard Deviation)
- **Uses**:
  - Volatility measurement (bands widen = high volatility)
  - Overbought/oversold (price touches bands)
  - Squeeze = low volatility, potential breakout coming

#### ATR (Average True Range)
- **Measures**: Average range of price movement
- **Uses**:
  - Position sizing
  - Stop loss placement (e.g., 2× ATR)
  - Volatility filter

### Volume Indicators

#### OBV (On-Balance Volume)
- **Calculation**: Cumulative volume (add on up days, subtract on down days)
- **Uses**: Confirm trends, spot divergences

#### Volume Profile
- **Shows**: Volume traded at each price level
- **Key Levels**:
  - POC (Point of Control): Price with most volume
  - Value Area: 70% of volume
- **Uses**: Identify support/resistance based on volume

---

## Support & Resistance

### Types of S/R
1. **Horizontal S/R**: Previous highs/lows
2. **Trendlines**: Diagonal support/resistance
3. **Moving Averages**: Dynamic S/R
4. **Fibonacci Levels**: Mathematical S/R
5. **Psychological Levels**: Round numbers ($100, $50, etc.)
6. **VWAP**: Intraday institutional benchmark

### Fibonacci Retracement Levels
| Level | Significance |
|-------|--------------|
| 23.6% | Shallow retracement |
| 38.2% | Common retracement |
| 50.0% | Key psychological level |
| 61.8% | Golden ratio - most important |
| 78.6% | Deep retracement |

### S/R Principles
- **Role Reversal**: Broken support becomes resistance (and vice versa)
- **Multiple Tests**: More tests = stronger level
- **Zones, Not Lines**: Think of S/R as areas, not exact prices
- **Confluence**: Multiple S/R at same level = stronger

---

## Market Structure

### Trend Identification
- **Uptrend**: Higher Highs (HH) and Higher Lows (HL)
- **Downtrend**: Lower Highs (LH) and Lower Lows (LL)
- **Sideways/Range**: Price bouncing between S/R

### Break of Structure (BOS)
- When price breaks a significant swing high/low
- Signals potential trend change

### Change of Character (CHoCH)
- First sign of trend weakness
- Uptrend: First Lower Low
- Downtrend: First Higher High

### Market Phases
1. **Accumulation**: Smart money buying (range after downtrend)
2. **Markup**: Uptrend begins
3. **Distribution**: Smart money selling (range after uptrend)
4. **Markdown**: Downtrend begins

---

## Volume Analysis

### Volume Principles
- **Volume confirms trends**: Rising price + rising volume = healthy trend
- **Volume precedes price**: Volume often changes before price
- **Breakouts need volume**: Valid breakouts have above-average volume
- **Climax volume**: Extremely high volume can signal exhaustion

### Volume Patterns
- **High volume + price move**: Conviction behind the move
- **High volume + no price move**: Absorption (big player accumulating/distributing)
- **Low volume pullback**: Healthy consolidation
- **Low volume breakout**: Likely false breakout

---

## Risk Management

### The 1% Rule
- **Never risk more than 1-2% of account on a single trade**
- Example: $10,000 account → Max risk $100-200 per trade

### Position Sizing Formula
```
Position Size = Risk Amount / (Entry - Stop Loss)

Example:
- Account: $10,000
- Risk: 1% = $100
- Entry: $50
- Stop Loss: $48
- Risk per share: $2
- Position Size: $100 / $2 = 50 shares
```

### Risk/Reward Ratio
- **Minimum**: 1:1.5 (risk $1 to make $1.50)
- **Ideal**: 1:2 or 1:3
- **Win rate math**:
  - 1:1 R/R needs >50% win rate to be profitable
  - 1:2 R/R needs >33% win rate to be profitable
  - 1:3 R/R needs >25% win rate to be profitable

### Stop Loss Types
1. **Fixed**: Set number of cents/points
2. **ATR-based**: Multiple of ATR (e.g., 2× ATR)
3. **Technical**: Below support, above resistance
4. **Time-based**: Exit if trade doesn't work within X time

### Position Management
- **Scale in**: Add to winning positions at key levels
- **Scale out**: Take partial profits at targets
- **Trail stop**: Move stop to breakeven, then trail with trend

---

## Trading Strategies

### Trend Following
1. Identify trend direction (moving averages, structure)
2. Wait for pullback to support
3. Enter on confirmation (candlestick pattern, bounce)
4. Stop below swing low
5. Target next resistance or trail stop

### Breakout Trading
1. Identify consolidation pattern (triangle, flag, range)
2. Wait for break of pattern with volume
3. Enter on breakout or retest
4. Stop below breakout level
5. Target: measured move

### Mean Reversion
1. Identify overextended move (RSI overbought/oversold, far from VWAP)
2. Wait for reversal signal at key level
3. Enter with tight stop
4. Target: mean (VWAP, moving average)

### Gap Trading
- **Gap Up**: Price opens above previous close
- **Gap Down**: Price opens below previous close
- **Gap Fill**: Price returns to fill the gap
- **Gap and Go**: Price continues in gap direction

---

## Psychology

### Key Principles
1. **Plan the trade, trade the plan**
2. **Cut losses quickly, let winners run**
3. **Don't revenge trade**
4. **Accept that losses are part of the game**
5. **Journal every trade**

### Common Mistakes
- Overtrading
- Moving stops (turning winners into losers)
- Averaging down on losers
- FOMO (Fear Of Missing Out)
- Not following the plan

### Pre-Trade Checklist
1. ✅ Is there a clear setup?
2. ✅ Does it align with the trend?
3. ✅ Is there a defined entry, stop, and target?
4. ✅ Is the risk/reward acceptable (≥1:2)?
5. ✅ Is position size correct (≤1-2% risk)?
6. ✅ Am I emotionally neutral?

---

## Quick Reference: Day Trading Essentials

### Best Indicators for Day Trading
1. **VWAP** - Institutional benchmark
2. **Moving Averages** (9, 20 EMA) - Trend direction
3. **RSI** - Overbought/oversold
4. **Volume** - Confirms moves
5. **ATR** - Volatility/stop placement

### Key Times (US Markets)
- **9:30-10:30 AM ET**: Opening range, highest volatility
- **11:30 AM-1:00 PM ET**: Lunch lull, avoid
- **2:00-4:00 PM ET**: Afternoon momentum, closing moves

### Best Patterns for Day Trading
1. **Opening Range Breakout**
2. **VWAP Bounce/Rejection**
3. **Bull/Bear Flags**
4. **Double Top/Bottom**
5. **Break of Structure**

---

*This guide serves as the knowledge foundation for Dojo Gains course content. Review and internalize these concepts to effectively teach and apply technical analysis.*
