import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'kalai.io - Your Marketing Runs Itself'
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
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0e1014',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Dynamic Glowing Sphere imitating The Agent WebGL Component via pure CSS rendering gradients */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, #f97316 0%, transparent 80%)',
          opacity: 0.1,
        }} />
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#0a1a3a',
          boxShadow: '0 0 40px 10px rgba(255,255,255,0.8), inset 0 0 20px rgba(255,255,255,0.5)',
        }} />

        {/* Foreground Minimal Typography resolving layout constraints explicitly without external imports */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10,
        }}>
          <span style={{ 
            color: 'white', 
            fontSize: 64, 
            letterSpacing: '-0.03em', 
            fontWeight: 600,
            opacity: 0.9,
            marginBottom: 20
          }}>
            Your work speaks for itself.
          </span>
          <span style={{ 
            color: '#888888', 
            fontSize: 64, 
            letterSpacing: '-0.03em', 
            fontWeight: 400 
          }}>
            But nobody can hear it.
          </span>

          <div style={{
            marginTop: 80,
            padding: '16px 32px',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '100px',
            color: 'white',
            fontSize: 24,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            display: 'flex',
          }}>
            kalai.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
