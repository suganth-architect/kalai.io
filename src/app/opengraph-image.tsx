import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Kalai.io - Autonomy for Architects'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Subtle glowing ring to emulate the Agent mesh */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(0,0,0,0) 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: 64,
              fontFamily: 'sans-serif',
              fontWeight: 600,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              whiteSpace: 'pre-wrap',
            }}
          >
            Kalai.io
          </div>
          
          <div
            style={{
              fontSize: 32,
              fontFamily: 'sans-serif',
              fontWeight: 400,
              color: '#888888',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: 16,
            }}
          >
            Autonomy for Architects
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
