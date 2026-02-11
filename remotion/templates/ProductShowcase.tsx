import { useVideoConfig, useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { z } from 'zod';

export const ProductShowcaseSchema = z.object({
  productName: z.string(),
  tagline: z.string(),
  price: z.string(),
  features: z.array(z.string()),
  primaryColor: z.string(),
  imageUrl: z.string().optional(),
});

export type ProductShowcaseProps = z.infer<typeof ProductShowcaseSchema>;

export const ProductShowcaseTemplate: React.FC<ProductShowcaseProps> = ({
  productName,
  tagline,
  price,
  features,
  primaryColor,
  imageUrl,
}) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // 动画时间线
  const bgProgress = interpolate(frame, [0, 30], [0, 1], { easing: Easing.out(Easing.ease) });
  const titleY = interpolate(frame, [10, 40], [100, 0], { easing: Easing.out(Easing.back(1.2)) });
  const titleOpacity = interpolate(frame, [10, 40], [0, 1]);
  const taglineOpacity = interpolate(frame, [35, 55], [0, 1]);
  const featuresStart = 60;
  
  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${primaryColor} 0%, #1a1a2e 100%)`,
        overflow: 'hidden',
      }}
    >
      {/* 动态背景图形 */}
      <div
        style={{
          position: 'absolute',
          width: width * 1.5,
          height: width * 1.5,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryColor}44 0%, transparent 70%)`,
          left: width / 2 - width * 0.75,
          top: height / 2 - width * 0.75,
          transform: `scale(${bgProgress}) rotate(${frame * 0.2}deg)`,
        }}
      />

      {/* 网格背景 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      {/* 左侧内容 */}
      <div
        style={{
          position: 'absolute',
          left: 80,
          top: '50%',
          transform: 'translateY(-50%)',
          width: width * 0.5,
          zIndex: 10,
        }}
      >
        {/* 产品名 */}
        <div
          style={{
            transform: `translateY(${titleY}px)`,
            opacity: titleOpacity,
          }}
        >
          <h1
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
            }}
          >
            {productName}
          </h1>
        </div>

        {/* 标语 */}
        <p
          style={{
            fontSize: 32,
            color: 'rgba(255,255,255,0.8)',
            marginBottom: 40,
            opacity: taglineOpacity,
          }}
        >
          {tagline}
        </p>

        {/* 特性列表 */}
        <div style={{ marginBottom: 50 }}>
          {features.map((feature, i) => {
            const delay = featuresStart + i * 15;
            const opacity = interpolate(frame, [delay, delay + 15], [0, 1]);
            const x = interpolate(frame, [delay, delay + 15], [-50, 0], { easing: Easing.out(Easing.ease) });
            
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: 20,
                  opacity,
                  transform: `translateX(${x}px)`,
                }}
              >
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: '50%',
                    background: primaryColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: 15,
                  }}
                >
                  ✓
                </div>
                <span
                  style={{
                    fontSize: 24,
                    color: 'white',
                  }}
                >
                  {feature}
                </span>
              </div>
            );
          })}
        </div>

        {/* 价格 */}
        <div
          style={{
            opacity: interpolate(frame, [120, 140], [0, 1]),
            transform: `scale(${interpolate(frame, [120, 150], [0.8, 1], { easing: Easing.out(Easing.back(1.5)) })})`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '20px 50px',
              background: 'white',
              borderRadius: 15,
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
            }}
          >
            <span
              style={{
                fontSize: 28,
                color: '#666',
                marginRight: 10,
              }}
            >
              仅售
            </span>
            <span
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: primaryColor,
              }}
            >
              {price}
            </span>
          </div>
        </div>
      </div>

      {/* 右侧产品展示 */}
      <div
        style={{
          position: 'absolute',
          right: 100,
          top: '50%',
          transform: `translateY(-50%) rotate(${interpolate(frame, [0, durationInFrames], [-5, 5])}deg)`,
          width: 400,
          height: 400,
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            background: imageUrl ? `url(${imageUrl})` : `linear-gradient(135deg, ${primaryColor}66, ${primaryColor}33)`,
            backgroundSize: 'cover',
            borderRadius: 30,
            boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 120,
            opacity: interpolate(frame, [20, 50], [0, 1]),
          }}
        >
          {imageUrl ? null : '📦'}
        </div>
        
        {/* 发光效果 */}
        <div
          style={{
            position: 'absolute',
            inset: -20,
            background: `radial-gradient(circle, ${primaryColor}44 0%, transparent 70%)`,
            borderRadius: 40,
            transform: `scale(${interpolate(frame, [20, 60], [0.5, 1.2])})`,
            opacity: interpolate(frame, [20, 60], [0, 0.5]),
          }}
        />
      </div>

      {/* 底部 CTA */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: '50%',
          transform: `translateX(-50%)`,
          opacity: interpolate(frame, [140, 160], [0, 1]),
        }}
      >
        <div
          style={{
            padding: '15px 60px',
            background: 'white',
            color: primaryColor,
            borderRadius: 50,
            fontSize: 28,
            fontWeight: 'bold',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          立即购买 →
        </div>
      </div>
    </AbsoluteFill>
  );
};
