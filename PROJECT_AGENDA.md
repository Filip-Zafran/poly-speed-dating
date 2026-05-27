# Duck Dating Apps - Project Agenda & Timeline

## 📅 Project Overview (2-3 Days Work)

**Goal**: Build two interconnected admin pages for PSD (dating event coordination)
- **Dashboard.html**: Filter & export 51 applicants
- **Dates.html**: Organize dating group events

**Links**: Dashboard ↔ Dates (bidirectional navigation)

---

## 📊 Quick Feature Summary

| Page | Core Features | Priority |
|------|---|---|
| **Dashboard** | Search, Filters (Gender/Intention/Style/Orientation), Export (CSV/Excel) | Must-Have |
| **Dates** | Auto-categorize, Sort by missing count, Color-coded tags, Remove participants, Copy emails | Must-Have |

---

## 🎯 Implementation Timeline

### **Day 1: Dashboard.html**

**Morning (2-3 hours)**
- [ ] HTML structure: Header + Sidebar + Grid layout
- [ ] CSS: Responsive layout, color palette
- [ ] Applicant data: 51 candidates array

**Afternoon (2-3 hours)**
- [ ] Sidebar filters: Gender, Relationship, Intention, Orientation, Age
- [ ] Search functionality: Real-time name/email search
- [ ] Filter logic: Combine multiple filters
- [ ] Apply/Reset buttons

**End of Day**
- [ ] Applicant cards/rows: Display filtered results
- [ ] CSV export: Download filtered data
- [ ] Excel export: Download filtered data as XLS
- [ ] Navigation button to dates.html

---

### **Day 2: Dates.html Setup & Core Logic**

**Morning (2-3 hours)**
- [ ] HTML structure: Header + Legend + Sections
- [ ] CSS: Tags, tables, responsive layout
- [ ] Header: Back button + navigation
- [ ] Legend: Instructions & missing count definition

**Afternoon (2-3 hours)**
- [ ] buildCategories(): Group applicants into categories
  - Handle "Open to both" → appears in BOTH Poly & Mono
  - Separate women/men for Straight categories
  - Single column for LGBTQ+ (total 10, any gender)
- [ ] calculateMissingCount(): 
  - LGBTQ+ = 10 total
  - Straight = 5 women + 5 men
- [ ] renderCategories(): Display all groups with tags

**End of Day**
- [ ] Sorting logic: DONE first, then by missing count ascending
- [ ] Color tags working: Relationship/Intention/Orientation
- [ ] Missing badges displaying correctly

---

### **Day 3: Dates.html Interactivity & Polish**

**Morning (2-3 hours)**
- [ ] Color opacity gradient (0-1 missing → darkest; 8+ missing → lightest)
- [ ] Participant cells: Hover dropdown with info
  - Email, Gender, Age, Intention, Relationship
- [ ] Copy emails button: Top 8 main participants only
- [ ] Remove button: Delete participant from category

**Afternoon (2-3 hours)**
- [ ] Backup promotion: When main removed, backup moves up
- [ ] Visual divider: Between main 8 and backup 2
- [ ] Responsive design: Mobile-friendly sections
- [ ] Back navigation to dashboard

**Testing & Polish (1-2 hours)**
- [ ] Test all filter combinations (Dashboard)
- [ ] Test export with filters (Dashboard)
- [ ] Test "Open to both" distribution (Dates)
- [ ] Test participant removal + promotion (Dates)
- [ ] Cross-page navigation works
- [ ] All colors & opacity correct
- [ ] Mobile responsive check

---

## 🎨 Color Coding Quick Reference

### Tags (Apply to all categories)
```
Relationship: Polyamorous (Purple) | Monogamous (Gray)
Intention: Casual (Pink) | Friends (Green) | Long-term (Blue)
Orientation: Straight (Orange) | LGBTQ+ (Pink-Purple)
```

### Opacity by Missing Count
```
Missing: 0-1  → opacity: 1.0   (darkest)
Missing: 2    → opacity: 0.9
Missing: 3    → opacity: 0.8
Missing: 4-5  → opacity: 0.7
Missing: 6-7  → opacity: 0.6
Missing: 8+   → opacity: 0.5   (lightest)
```

---

## 📝 Key Technical Details

### Dashboard
- **51 applicants** in JavaScript array
- **Filters**: Gender, Relationship, Intention, Orientation, Age
- **Export**: CSV (all columns) + Excel (same)
- **Search**: Real-time name/email matching

### Dates
- **Build categories** from applicants dynamically
- **"Open to both"** → appears in BOTH Polyamorous & Monogamous
- **LGBTQ+**: 10 total (any gender mix) = 8 main + 2 backup
- **Straight**: 5W + 5M = (4W+4M main) + (1W+1M backup)
- **Sort**: DONE first, then ascending missing count
- **Opacity**: Lighter colors = more missing people (higher urgency)

---

## ✅ Definition of Done

### Dashboard Complete When:
- ✓ All filters work individually & combined
- ✓ Search finds applicants by name/email
- ✓ CSV export works with filters applied
- ✓ Excel export works with filters applied
- ✓ Can navigate to dates.html
- ✓ Responsive on mobile/tablet

### Dates Complete When:
- ✓ All applicants categorized correctly
- ✓ "Open to both" in BOTH categories
- ✓ DONE categories appear first
- ✓ Non-DONE sorted by ascending missing
- ✓ Color opacity: Darkest (0-1 missing) → Lightest (8+ missing)
- ✓ Participant removal works + backup promotes
- ✓ Copy emails gets exactly 8 people
- ✓ Hover shows full participant info
- ✓ Can navigate back to dashboard
- ✓ Responsive & mobile-friendly

---

## 🚀 Success Metrics

After completing, verify:

1. **Dashboard**
   - [ ] Can filter by any single category
   - [ ] Can filter by 3+ categories simultaneously
   - [ ] Export includes only filtered results
   - [ ] Search works with partial names
   - [ ] Page responsive at 1024px, 768px, 375px widths

2. **Dates**
   - [ ] Every applicant appears in exactly one or two categories (two only if "Open to both")
   - [ ] LGBTQ+ categories have up to 10 people total
   - [ ] Straight categories show 5W + 5M split clearly
   - [ ] DONE status shows when filled
   - [ ] Categories with 1 missing appear at top (after DONE)
   - [ ] Categories with 8+ missing appear near bottom with light colors
   - [ ] Removing person automatically promotes next backup

---

## 💾 File References

- **Source files to review**:
  - `dashboard.html` (1,308 lines) - Reference implementation
  - `dates.html` (983 lines) - Reference implementation
  
- **Documentation**:
  - `COLLEAGUE_ONBOARDING.md` - Full detailed spec (this document's companion)
  - `PROJECT_AGENDA.md` - This quick reference (you're reading it!)

---

## 🤔 Common Questions

**Q: Do I need to preserve data between page loads?**
A: No, demo data only. Refresh is fine. (LocalStorage optional for filters.)

**Q: How do I handle "Open to both" applicants?**
A: Don't merge categories. Create separate category entries for each style, but add same person to both.

**Q: What's the priority - Dashboard or Dates?**
A: Dashboard first (simpler, independent). Then Dates (uses applicant data from Dashboard).

**Q: Do the pages need to share state?**
A: No, they're independent views of same data. No cross-page state needed.

**Q: Should filters persist when navigating?**
A: Not required, but nice-to-have with LocalStorage.

---

## 📞 Support & Resources

- Review `COLLEAGUE_ONBOARDING.md` for detailed specs
- Check existing files for color codes & exact feature implementations
- Test incrementally: Filter one category, then combine
- For missing count logic: Test with LGBTQ+ and Straight separately first

Good luck! 🎉
