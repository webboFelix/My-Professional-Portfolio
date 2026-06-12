# Frontend Data Caching & State Management Implementation

## Overview

The frontend now implements intelligent caching with Redux to minimize backend requests and preserve browser state. Data is cached locally in the browser and persists across page navigations.

## How It Works

### 1. **Automatic Caching**

- When a component requests data (posts, labs, projects, videos), it first checks the browser's localStorage
- If cached data exists and hasn't expired (5 minutes), it returns immediately **without** calling the backend
- If cache is expired or missing, it fetches from the backend and updates the cache
- All data is stored in Redux for runtime state management

### 2. **Cache Storage**

Data is cached using `localStorage` with the following keys:

- `portfolio_cache_posts` - Blog posts
- `portfolio_cache_labs` - Lab writeups
- `portfolio_cache_projects` - Projects
- `portfolio_cache_videos` - Videos

Each cache entry includes:

```typescript
{
  data: T[],           // The actual data
  timestamp: number    // When it was cached (milliseconds)
}
```

### 3. **Cache Expiry**

- **Default TTL**: 5 minutes (300,000 ms)
- After 5 minutes, cache is automatically cleared and fresh data is fetched on next request
- Customizable by modifying `CACHE_EXPIRY_MS` in `cacheUtils.ts`

### 4. **Redux Integration**

Redux slices now track:

- `items` - The cached data
- `loading` - Loading state
- `error` - Any errors
- `lastFetched` - Timestamp of last successful fetch

## Usage

### For Components Using Hooks (Existing Pattern)

No changes needed! The hooks automatically use caching:

```typescript
import { usePosts } from "@/lib/hooks/usePosts";
import { useLabs } from "@/lib/hooks/useLabs";
import { useProjects } from "@/lib/hooks/useProjects";
import { useVideos } from "@/lib/hooks/useVideos";

export default function MyComponent() {
  const { posts, loading } = usePosts(); // Auto-cached
  const { labs } = useLabs(); // Auto-cached
  const { projects } = useProjects(); // Auto-cached
  const { videos } = useVideos(); // Auto-cached

  // Use the data - it's already cached on subsequent renders
}
```

### For Manual Refresh (Force Backend Call)

Use the `dataFetching.ts` utilities:

```typescript
import { refreshPosts, refreshAllData } from "@/lib/dataFetching";
import { useAppDispatch } from "@/lib/hooks/useRedux";

export default function Header() {
  const dispatch = useAppDispatch();

  const handleRefresh = async () => {
    // Clear cache and fetch fresh data
    await refreshPosts(dispatch);
  };

  return (
    <button onClick={handleRefresh}>
      🔄 Refresh Posts
    </button>
  );
}
```

### Available Refresh Functions

```typescript
// Refresh all data at once
refreshAllData(dispatch);

// Refresh specific data types
refreshPosts(dispatch);
refreshLabs(dispatch);
refreshProjects(dispatch);
refreshVideos(dispatch);
```

## Caching Utilities

Located in `lib/cacheUtils.ts`:

```typescript
// Get cached data (returns null if expired/not found)
const data = getFromCache<Post[]>("portfolio_cache_posts");

// Save data to cache
saveToCache("portfolio_cache_posts", posts);

// Check if cache is expired
const isExpired = isCacheExpired("portfolio_cache_posts");

// Clear specific cache
clearCache("portfolio_cache_posts");

// Clear all portfolio cache
clearAllCache();

// Get cache timestamp (when it was created)
const timestamp = getCacheTimestamp("portfolio_cache_posts");
```

## Performance Benefits

### Before (Without Caching)

- Every page load → Backend API call
- Every component mount → Backend API call
- Navigation between pages → Backend API calls
- **Result**: Unnecessary network overhead, slower UX

### After (With Caching)

- First load → Backend API call + cache
- Subsequent loads (within 5 min) → Instant from cache
- After 5 min → Backend API call + cache refresh
- **Result**: Reduced server load, instant UX, lower bandwidth

## Browser Storage

- **Storage Type**: localStorage (persists across tabs/sessions)
- **Storage Limit**: Usually 5-10MB per domain
- **Current Usage**: ~50-100KB per cached dataset (minimal)
- **Visibility**: Open DevTools → Application → Local Storage → see `portfolio_cache_*` keys

## Configuration

### Change Cache Duration

Edit `lib/cacheUtils.ts`:

```typescript
// Default: 5 minutes
const CACHE_EXPIRY_MS = 5 * 60 * 1000;

// Change to 10 minutes:
const CACHE_EXPIRY_MS = 10 * 60 * 1000;

// Change to 1 minute:
const CACHE_EXPIRY_MS = 1 * 60 * 1000;
```

## Files Modified

1. **lib/cacheUtils.ts** (NEW)
   - Cache management utilities
   - localStorage integration
   - Expiry logic

2. **lib/dataFetching.ts** (NEW)
   - Convenient functions for refreshing data
   - Useful for manual refresh actions

3. **lib/slices/postsSlice.ts** (UPDATED)
   - Added `lastFetched` state
   - Integrated caching logic
   - Checks cache before API call

4. **lib/slices/labsSlice.ts** (UPDATED)
   - Same as postsSlice

5. **lib/slices/projectsSlice.ts** (UPDATED)
   - Same as postsSlice

6. **lib/slices/videosSlice.ts** (UPDATED)
   - Same as postsSlice

## Redux Hooks (Unchanged)

Existing hooks still work exactly the same:

- `usePosts()` - Returns `{ posts, loading, error }`
- `useLabs()` - Returns `{ labs, loading, error }`
- `useProjects()` - Returns `{ projects, loading, error }`
- `useVideos()` - Returns `{ videos, loading, error }`

**No UI changes needed!** The caching is transparent to components.

## Debugging

### Check if Cache is Working

1. Open browser DevTools (F12)
2. Go to Application tab → Local Storage
3. Look for keys like:
   - `portfolio_cache_posts`
   - `portfolio_cache_labs`
   - `portfolio_cache_projects`
   - `portfolio_cache_videos`
4. Click to expand and see the cached data and timestamp

### Monitor Network Requests

1. Open DevTools → Network tab
2. Navigate between pages
3. First navigation → API calls visible
4. Second navigation (within 5 min) → **No API calls** (serving from cache)
5. After 5 min → API calls resume

### Clear All Cache Manually

In browser console:

```javascript
// Clear all portfolio cache
localStorage.removeItem("portfolio_cache_posts");
localStorage.removeItem("portfolio_cache_labs");
localStorage.removeItem("portfolio_cache_projects");
localStorage.removeItem("portfolio_cache_videos");
```

## Migration Notes

- ✅ **Backward compatible** - No breaking changes
- ✅ **Transparent** - Components don't need modification
- ✅ **Progressive** - Works with or without JavaScript enabled
- ✅ **Optional** - Can be disabled by removing cache checks

## Future Enhancements

Possible improvements:

- Add IndexedDB for larger datasets
- Implement Service Worker caching
- Add background refresh (update cache before expiry)
- Add cache size monitoring
- Configurable TTL per data type
