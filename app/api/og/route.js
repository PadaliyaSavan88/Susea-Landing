import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const title = searchParams.get('title') || 'Susea Blog'
  const topic = searchParams.get('topic') || 'Freight Intelligence'

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
          padding: '64px',
          background: 'linear-gradient(135deg, #0E1726 0%, #1a2a42 60%, #0E1726 100%)',
          position: 'relative',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(74,130,217,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(240,112,32,0.1) 0%, transparent 40%)',
          }}
        />
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <div
            style={{
              background: 'rgba(74,130,217,0.2)',
              border: '1px solid rgba(74,130,217,0.4)',
              borderRadius: '999px',
              padding: '6px 16px',
              color: '#8FB3EC',
              fontSize: '14px',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}
          >
            {topic.toUpperCase()}
          </div>
        </div>
        <div
          style={{
            fontSize: title.length > 60 ? '40px' : '52px',
            fontWeight: 700,
            color: '#FFFFFF',
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            maxWidth: '900px',
            marginBottom: '32px',
          }}
        >
          {title}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #2F6BD8, #4A82D9)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                fontWeight: 800,
                color: '#fff',
              }}
            >
              S
            </div>
            <div style={{ color: '#6B7C96', fontSize: '16px', fontWeight: 500 }}>susea.ai</div>
          </div>
          <div style={{ color: '#41506A', fontSize: '14px' }}>AI pricing OS for freight forwarders</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
