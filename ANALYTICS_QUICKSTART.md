# 📊 Analytics Quick Setup - 5 Minutes

## Google Analytics 4 (Primary)

1. **Visit**: https://analytics.google.com
2. **Create Property** for `drmogalshah.com.np`
3. **Copy** Measurement ID: `G-XXXXXXXXXX`
4. **Paste** into `/src/app/config/analytics.ts`:
   ```typescript
   googleAnalyticsId: "G-YOUR-ID-HERE",
   ```
5. **Done!** ✅

---

## Microsoft Clarity (Bonus - Heatmaps & Recordings)

1. **Visit**: https://clarity.microsoft.com
2. **Add Project** for `drmogalshah.com.np`
3. **Copy** Project ID: `abc123xyz`
4. **Paste** into `/src/app/config/analytics.ts`:
   ```typescript
   microsoftClarityId: "YOUR-CLARITY-ID",
   ```
5. **Done!** ✅

---

## What You Get (Both Free Forever):

### Google Analytics:
- 📊 Visitor count & trends
- 🌍 Traffic sources
- 📱 Device & browser stats
- ⏱️ Real-time dashboard
- 📈 Custom goals & events

### Microsoft Clarity:
- 🎥 Session recordings
- 🔥 Click heatmaps
- 😤 Rage click detection
- 📱 Mobile behavior
- 💡 UX insights

---

## Files Modified:
- ✅ `/src/app/App.tsx` - Analytics integration
- ✅ `/src/app/components/GoogleAnalytics.tsx` - GA4 component
- ✅ `/src/app/components/MicrosoftClarity.tsx` - Clarity component
- ✅ `/src/app/config/analytics.ts` - Configuration (edit this file!)
- ✅ `/src/app/hooks/useAnalytics.ts` - Custom event tracking

---

## Verify It's Working:

1. Add your tracking IDs to `/src/app/config/analytics.ts`
2. Deploy your website
3. Visit your website
4. Check dashboards:
   - GA4: Reports → Realtime
   - Clarity: Dashboard (wait 5-10 min)

**See yourself as a visitor?** ✅ It's working!

---

## Cost: $0.00/month 🎉

No credit card needed. No usage limits. Works on any hosting platform!
