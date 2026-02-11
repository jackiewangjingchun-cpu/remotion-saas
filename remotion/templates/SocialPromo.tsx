import { useVideoConfig, useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { z } from 'zod';

export const SocialPromoSchema = z.object({
  headline: z.string(),
  discount: z.string(),
  cta: z.string(),
  bgImage: z.string().optional(),
  primaryColor: z.string(),
});

export type SocialPromoProps = z.infer<typeof SocialPromoSchema>;

export const SocialPromoTemplate: React.FC<SocialPromoProps> = ({
  headline,
  discount,
  cta,
  bgImage,
  primaryColor,
}) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // 脉冲动画
  const pulse = interpolate(
    frame,
    [0, 30, 60],
    [1, 1.1, 1],
    { easing: Easing.inOut(Easing.ease) }
  );

  // 文字动画
  const headlineY = interpolate(frame, [0, 20], [100, 0], { easing: Easing.out(Easing.back(1.5)) });
  const headlineOpacity = interpolate(frame, [0, 20], [0, 1]);
  
  const discountScale = interpolate(
    frame,
    [15, 35],
    [0, 1],
    { easing: Easing.out(Easing.elastic(1.2)) }
  );
  
  const ctaOpacity = interpolate(frame, [35, 50], [0, 1]);
  const ctaY = interpolate(frame, [35, 50], [30, 0], { easing: Easing.out(Easing.ease) });

  // 闪光效果
  const shineX = interpolate(frame, [0, durationInFrames], [-width, width * 2]);

  return (
    <AbsoluteFill
      style={{
        background: bgImage
          ? `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${bgImage})`
          : `linear-gradient(135deg, ${primaryColor} 0%, ${primaryColor}dd 50%, #000 100%)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* 动态背景图案 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(circle at 20% 80%, ${primaryColor}66 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, white 0%, transparent 30%)
          `,
          opacity: 0.6,
        }}
      />

      {/* 浮动粒子 */}
      {Array.from({ length: 15 }).map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${(i * 7) % 100}%`,
            top: `${interpolate(
              frame,
              [0, durationInFrames],
              [100 + i * 10, -20]
            )}%`,
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            borderRadius: '50%',
            background: i % 2 === 0 ? 'white' : primaryColor,
            opacity: 0.3 + (i % 5) * 0.1,
          }}
        />
      ))}

      {/* 主要内容 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          width: width * 0.9,
        }}
      >
        {/* 标签 */}
        <div
          style={{
            display: 'inline-block',
            padding: '10px 30px',
            background: 'white',
            borderRadius: 30,
            marginBottom: 30,
            opacity: interpolate(frame, [0, 15], [0, 1]),
            transform: `translateY(${interpolate(frame, [0, 15], [-20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 'bold',
              color: primaryColor,
            }}
          >
            🔥 限时特惠
          </span>
        </div>

        {/* 大标题 */}
        <div
          style={{
            transform: `translateY(${headlineY}px)`,
            opacity: headlineOpacity,
          }}
        >
          <h1
            style={{
              fontSize: 64,
              fontWeight: 'bold',
              color: 'white',
              marginBottom: 20,
              textShadow: '0 4px 20px rgba(0,0,0,0.3)',
              lineHeight: 1.2,
            }}
          >
            {headline}
          </h1>
        </div>

        {/* 折扣信息 */}
        <div
          style={{
            transform: `scale(${discountScale})`,
            opacity: discountScale,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              position: 'relative',
            }}
          >
            {/* 闪光效果 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: shineX,
                width: 100,
                height: '100%',
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
                transform: 'skewX(-20deg)',
              }}
            />
            
            <div
              style={{
                padding: '30px 60px',
                background: `linear-gradient(135deg, #FFD700, #FFA500)`,
                borderRadius: 20,
                boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
                transform: `scale(${pulse})`,
              }}
            >
              <span
                style={{
                  fontSize: 80,
                  fontWeight: 'bold',
                  color: '#333',
                  textShadow: '2px 2px 0 rgba(255,255,255,0.5)',
                }}
              >
                {discount}
              </span>
            </div>
          </div>
        </div>

        {/* 倒计时提示 */}
        <div
          style={{
            opacity: interpolate(frame, [50, 65], [0, 1]),
            marginBottom: 40,
          }}
        >
          <p
            style={{
              fontSize: 24,
              color: 'rgba(255,255,255,0.9)',
            }}
          >
            ⚡ 优惠即将结束，手慢无！
          </p>
        </div>

        {/* CTA 按钮 */}
        <div
          style={{
            opacity: ctaOpacity,
            transform: `translateY(${ctaY}px)`,
          }}
        >
          <div
            style={{
              display: 'inline-block',
              padding: '25px 70px',
              background: 'white',
              borderRadius: 50,
              boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
              animation: frame > 50 ? 'bounce 0.5s ease infinite alternate' : 'none',
            }}
          >
            <span
              style={{
                fontSize: 32,
                fontWeight: 'bold',
                color: primaryColor,
              }}
            >
              {cta} →
            </span>
          </div>
        </div>

        {/* 信任标识 */}
        <div
          style={{
            marginTop: 50,
            opacity: interpolate(frame, [80, 100], [0, 1]),
            display: 'flex',
            justifyContent: 'center',
            gap: 30,
            alignItems: 'center',
          }}
        >
          {['✅ 正品保证', '🚚 快速发货', '💯 售后无忧'].map((item, i) => (
            <span
              key={i}
              style={{
                fontSize: 16,
                color: 'rgba(255,255,255,0.8)',
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
