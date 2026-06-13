import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX = 10;
const MAX_SCORE = 500;
const MIN_SECONDS_PER_CARD = 2;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const { nickname, score, cause_of_death, duration_seconds } = body;

    // Validate inputs
    if (typeof score !== 'number' || score < 0 || score > MAX_SCORE) {
      return new Response(JSON.stringify({ error: 'Invalid score' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (typeof duration_seconds !== 'number' || duration_seconds < score * MIN_SECONDS_PER_CARD) {
      return new Response(JSON.stringify({ error: 'Score too fast for duration' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const validCauses = [
      'budget_0', 'budget_100',
      'zufriedenheit_0', 'zufriedenheit_100',
      'personal_0', 'personal_100',
      'effizienz_0', 'effizienz_100',
    ];
    if (!validCauses.includes(cause_of_death)) {
      return new Response(JSON.stringify({ error: 'Invalid cause of death' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const sanitizedNickname = nickname
      ? String(nickname).trim().slice(0, 20)
      : null;

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Simple rate limit check by IP
    const clientIp = req.headers.get('x-forwarded-for') ?? 'unknown';
    const windowStart = new Date(Date.now() - RATE_LIMIT_WINDOW).toISOString();

    const { count } = await supabaseAdmin
      .from('scores')
      .select('*', { count: 'exact', head: true })
      .eq('client_ip', clientIp)
      .gte('created_at', windowStart);

    if ((count ?? 0) >= RATE_LIMIT_MAX) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { data, error } = await supabaseAdmin
      .from('scores')
      .insert({
        nickname: sanitizedNickname,
        score,
        cause_of_death,
        duration_seconds,
        client_ip: clientIp,
      })
      .select()
      .single();

    if (error) throw error;

    return new Response(JSON.stringify(data), {
      status: 201,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
