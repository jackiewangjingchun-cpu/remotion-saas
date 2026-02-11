import { useVideoConfig, useCurrentFrame, interpolate, Easing } from 'remotion';
import { z } from 'zod';

export const BirthdaySchema = z.object({
  name: z.string(),
  age: z.number(),
  message: z.string(),
  primaryColor: z.string(),
  secondaryColor: z.string(),
});

export type BirthdayProps = z.infer<typeof BirthdaySchema>;

export const BirthdayTemplate: React.FC<BirthdayProps> = ({
  name,
  age,
  message,
  primaryColor,
  secondaryColor,
}) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();

  // 动画
  const progress = frame / durationInFrames;
  
  const titleOpacity = interpolate(
    frame,
    [0, 15],
    [0, 1],
    { easing: Easing.out(Easing.ease) }
  );

  const titleY = interpolate(
    frame,
    [0, 20],
    [50, 0],
    { easing: Easing.out(Easing.back(1.5)) }
  );

  const ageScale = interpolate(
    frame,
    [20, 35],
    [0, 1],
    { easing: Easing.out(Easing.elastic(1)) }
  );

  const messageOpacity = interpolate(
    frame,
    [40, 55],
    [0, 1],
    { easing: Easing.out(Easing.ease) }
  );

  const balloonY = interpolate(
    frame,
    [0, durationInFrames],
    [height + 100, -200],
    { easing: Easing.linear }
  );

  // 生成气球
  const balloons = Array.from({ length: 8 }, (_, i) => ({
    x: (width / 9) * (i + 1),
    delay: i * 10,
    color: i % 2 === 0 ? primaryColor : secondaryColor,
  }));

  return (
    <div
      style={{
        width,
        height,
        background: `linear-gradient(135deg, ${primaryColor}22, ${secondaryColor}22)`,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 背景装饰 */}
      <svg
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: 0.1,
        }}
      >
        {Array.from({ length: 20 }).map((_, i) => (
          <circle
            key={i}
            cx={Math.random() * width}
            cy={Math.random() * height}
            r={Math.random() * 30 + 10}
            fill={i % 2 === 0 ? primaryColor : secondaryColor}
          />
        ))}
      </svg>

      {/* 气球 */}
      {balloons.map((balloon, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: balloon.x - 40,
            top: balloonY + balloon.delay * 3,
            width: 80,
            height: 100,
            borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
            background: `radial-gradient(circle at 30% 30%, ${balloon.color}88, ${balloon.color})`,
            transform: `rotate(${Math.sin(frame * 0.02 + i) * 10}deg)`,
          }}
        >
          {/* 气球绳子 */}
          <svg
            style={{
              position: 'absolute',
              top: 95,
              left: 35,
            }}
            width="10"
            height="60"
          >
            <path
              d={`M 5 0 Q ${5 + Math.sin(frame * 0.05 + i) * 5} 30, 5 60`}
              stroke={balloon.color}
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
      ))}

      {/* 主要内容 */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          zIndex: 10,
        }}
      >
        {/* 标题 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          <h1
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: primaryColor,
              textShadow: `4px 4px 0 ${secondaryColor}`,
              marginBottom: 20,
            }}
          >
            Happy Birthday
          </h1>
        </div>

        {/* 名字 */}
        <div
          style={{
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
            transitionDelay: '0.1s',
          }}
        >
          <h2
            style={{
              fontSize: 60,
              color: '#333',
              marginBottom: 30,
            }}
          >
            {name}
          </h2>
        </div>

        {/* 年龄 */}
        <div
          style={{
            transform: `scale(${ageScale})`,
            opacity: ageScale,
          }}
        >
          <div
            style={{
              fontSize: 120,
              fontWeight: 'bold',
              color: secondaryColor,
              textShadow: `4px 4px 0 ${primaryColor}`,
              marginBottom: 30,
            }}
          >
            {age}
          </div>
          <div
            style={{
              fontSize: 40,
              color: '#666',
            }}
          >
            岁生日快乐！
          </div>
        </div>

        {/* 祝福语 */}
        <div
          style={{
            opacity: messageOpacity,
            marginTop: 50,
            padding: '20px 40px',
            background: 'rgba(255,255,255,0.9)',
            borderRadius: 20,
            maxWidth: 800,
          }}
        >
          <p
            style={{
              fontSize: 36,
              color: '#444',
              lineHeight: 1.6,
            }}
          >
            {message}
          </p>
        </div>

        {/* 蛋糕表情 */}
        <div
          style={{
            fontSize: 100,
            marginTop: 40,
            opacity: interpolate(frame, [80, 95], [0, 1]),
            transform: `scale(${interpolate(frame, [80, 100], [0.5, 1], { easing: Easing.out(Easing.elastic(1)) })})`,
          }}
        >
          🎂
        </div>
      </div>
    </div>
  );
};
