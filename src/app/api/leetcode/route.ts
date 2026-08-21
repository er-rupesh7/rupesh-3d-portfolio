import { unstable_cache } from 'next/cache';
import { NextResponse } from 'next/server';

const LEETCODE_USERNAME = '3rupeshkr';

export const dynamic = 'force-dynamic';

const getLeetCodeProfile = unstable_cache(
  async () => {
    const response = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Referer: `https://leetcode.com/u/${LEETCODE_USERNAME}/`,
        'User-Agent': 'Rupesh-Portfolio/1.0',
      },
      body: JSON.stringify({
        query: `
          query userProfile($username: String!) {
            matchedUser(username: $username) {
              username
              profile {
                realName
                userAvatar
                ranking
              }
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
          }
        `,
        variables: { username: LEETCODE_USERNAME },
      }),
      cache: 'no-store',
    });

    if (!response.ok) throw new Error(`LeetCode responded with ${response.status}`);

    const payload = await response.json();
    const user = payload?.data?.matchedUser;
    if (!user) throw new Error('LeetCode profile was not found');

    const solved = user.submitStats?.acSubmissionNum?.find(
      (entry: { difficulty: string; count: number }) => entry.difficulty === 'All'
    )?.count;

    return {
      username: user.username,
      realName: user.profile?.realName || 'Rupesh Kumar',
      avatarUrl: user.profile?.userAvatar || null,
      ranking: user.profile?.ranking || null,
      solved: typeof solved === 'number' ? solved : 0,
      updatedAt: new Date().toISOString(),
    };
  },
  ['leetcode-profile-3rupeshkr'],
  { revalidate: 1800 }
);

export async function GET() {
  try {
    const profile = await getLeetCodeProfile();
    return NextResponse.json(profile, {
      headers: { 'Cache-Control': 'public, s-maxage=1800, stale-while-revalidate=86400' },
    });
  } catch (error) {
    console.error('LeetCode profile fetch failed:', error);
    return NextResponse.json(
      { error: 'LeetCode data is temporarily unavailable' },
      { status: 503, headers: { 'Cache-Control': 'no-store' } }
    );
  }
}
