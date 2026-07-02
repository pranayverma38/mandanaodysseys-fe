const WISHLIST_METADATA_KEY = 'wishlist_handles'

export function parseWishlistHandles(metadata: Record<string, unknown> | null | undefined): string[] {
  if (!metadata?.[WISHLIST_METADATA_KEY]) {
    return []
  }

  const raw = metadata[WISHLIST_METADATA_KEY]

  if (Array.isArray(raw)) {
    return raw.filter((item): item is string => typeof item === 'string')
  }

  if (typeof raw === 'string') {
    try {
      const parsed = JSON.parse(raw) as unknown
      if (Array.isArray(parsed)) {
        return parsed.filter((item): item is string => typeof item === 'string')
      }
    } catch {
      return raw
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean)
    }
  }

  return []
}

export function serializeWishlistHandles(handles: string[]): Record<string, string> {
  const uniqueHandles = [...new Set(handles.filter(Boolean))]
  return {
    [WISHLIST_METADATA_KEY]: JSON.stringify(uniqueHandles),
  }
}

export function toggleWishlistHandle(handles: string[], packageHandle: string): string[] {
  if (handles.includes(packageHandle)) {
    return handles.filter((handle) => handle !== packageHandle)
  }

  return [...handles, packageHandle]
}
