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
              submissionCalendar
              submitStats {
                acSubmissionNum {
                  difficulty
                  count
                }
              }
            }
            recentAcSubmissionList(username: $username, limit: 20) {
              title
              titleSlug
              timestamp
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

    const solvedByDifficulty = Object.fromEntries(
      (user.submitStats?.acSubmissionNum || []).map(
        (entry: { difficulty: string; count: number }) => [entry.difficulty.toLowerCase(), entry.count]
      )
    );
    let submissionCalendar: Record<string, number> = {};
    try {
      submissionCalendar = JSON.parse(user.submissionCalendar || '{}');
    } catch {
      submissionCalendar = {};
    }

    const today = new Date();
    today.setUTCHours(0, 0, 0, 0);
    const activity = Array.from({ length: 30 }, (_, index) => {
      const date = new Date(today);
      date.setUTCDate(today.getUTCDate() - (29 - index));
      const timestamp = Math.floor(date.getTime() / 1000);
      return {
        date: date.toISOString().slice(0, 10),
        count: submissionCalendar[String(timestamp)] || 0,
      };
    });

    return {
      username: user.username,
      realName: user.profile?.realName || 'Rupesh Kumar',
      avatarUrl: user.profile?.userAvatar || null,
      ranking: user.profile?.ranking || null,
      solved: solvedByDifficulty.all || 0,
      difficulty: {
        easy: solvedByDifficulty.easy || 0,
        medium: solvedByDifficulty.medium || 0,
        hard: solvedByDifficulty.hard || 0,
      },
      submissionCalendar,
      activity,
      recentAccepted: (payload?.data?.recentAcSubmissionList || []).map(
        (submission: { title: string; titleSlug: string; timestamp: string }) => ({
          ...submission,
          url: `https://leetcode.com/problems/${submission.titleSlug}/`,
        })
      ),
      updatedAt: new Date().toISOString(),
    };
  },
  ['leetcode-profile-3rupeshkr-v2'],
  { revalidate: 1800 }
);

export async function GET(request: Request) {
  try {
    const profile = await getLeetCodeProfile();
    if (new URL(request.url).searchParams.get('avatar') === '1' && profile.avatarUrl) {
      const avatarResponse = await fetch(profile.avatarUrl, { cache: 'force-cache' });
      if (!avatarResponse.ok) throw new Error('LeetCode avatar could not be loaded');
      return new NextResponse(await avatarResponse.arrayBuffer(), {
        headers: {
          'Content-Type': avatarResponse.headers.get('Content-Type') || 'image/jpeg',
          'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=604800',
        },
      });
    }
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
