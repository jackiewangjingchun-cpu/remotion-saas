import { useVideoConfig, useCurrentFrame, interpolate, Easing, AbsoluteFill } from 'remotion';
import { z } from 'zod';

const DataPointSchema = z.object({
  label: z.string(),
  value: z.number(),
  color: z.string(),
});

export const DataReportSchema = z.object({
  title: z.string(),
  subtitle: z.string(),
  dataPoints: z.array(DataPointSchema),
  primaryColor: z.string(),
});

export type DataReportProps = z.infer<typeof DataReportSchema>;

export const DataReportTemplate: React.FC<DataReportProps> = ({
  title,
  subtitle,
  dataPoints,
  primaryColor,
}) => {
  const { width, height, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const centerX = width / 2;
  const centerY = height / 2;

  // 动画进度
  const titleOpacity = interpolate(frame, [0, 20], [0, 1]);
  const subtitleOpacity = interpolate(frame, [15, 35], [0, 1]);
  
  // 圆环参数
  const maxRadius = 300;
  const strokeWidth = 40;
  
  // 计算总值
  const total = dataPoints.reduce((sum, dp) => sum + dp.value, 0);
  
  // 计算每个数据点的角度
  let currentAngle = -90; // 从顶部开始
  const segments = dataPoints.map((dp) => {
    const angle = (dp.value / total) * 360;
    const startAngle = currentAngle;
    currentAngle += angle;
    return {
      ...dp,
      startAngle,
      endAngle: currentAngle,
      percentage: Math.round((dp.value / total) * 100),
    };
  });

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(135deg, #0f0f23 0%, #1a1a3e 50%, #16213e 100%)',
      }}
    >
      {/* 网格背景 */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* 发光圆环背景 */}
      <div
        style={{
          position: 'absolute',
          left: centerX - maxRadius - 50,
          top: centerY - maxRadius - 50,
          width: (maxRadius + 50) * 2,
          height: (maxRadius + 50) * 2,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${primaryColor}22 0%, transparent 70%)`,
          transform: `scale(${interpolate(frame, [0, 60], [0.8, 1.2])})`,
        }}
      />

      {/* 标题 */}
      <div
        style={{
          position: 'absolute',
          top: 60,
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center',
        }}
      >
        <h1
          style={{
            fontSize: 48,
            fontWeight: 'bold',
            color: 'white',
            marginBottom: 10,
            opacity: titleOpacity,
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: 24,
            color: 'rgba(255,255,255,0.6)',
            opacity: subtitleOpacity,
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* 数据圆环 */}
      <svg
        style={{
          position: 'absolute',
          left: centerX - maxRadius,
          top: centerY - maxRadius - 20,
          width: maxRadius * 2,
          height: maxRadius * 2,
        }}
      >
        {/* 背景圆环 */}
        <circle
          cx={maxRadius}
          cy={maxRadius}
          r={maxRadius - strokeWidth / 2}
          fill="none"
          stroke="rgba(255,255,255,0.1)"
          strokeWidth={strokeWidth}
        />

        {/* 数据段 */}
        {segments.map((segment, i) => {
          const radius = maxRadius - strokeWidth / 2;
          const startRad = (segment.startAngle * Math.PI) / 180;
          const endRad = (segment.endAngle * Math.PI) / 180;
          
          const x1 = maxRadius + radius * Math.cos(startRad);
          const y1 = maxRadius + radius * Math.sin(startRad);
          const x2 = maxRadius + radius * Math.cos(endRad);
          const y2 = maxRadius + radius * Math.sin(endRad);
          
          const largeArc = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
          
          const pathData = `
            M ${maxRadius} ${maxRadius}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}
            Z
          `;

          const delay = 40 + i * 20;
          const progress = interpolate(
            frame,
            [delay, delay + 30],
            [0, 1],
            { easing: Easing.out(Easing.cubic) }
          );

          const segmentEndAngle = segment.startAngle + (segment.endAngle - segment.startAngle) * progress;
          const segmentEndRad = (segmentEndAngle * Math.PI) / 180;
          const segmentX2 = maxRadius + radius * Math.cos(segmentEndRad);
          const segmentY2 = maxRadius + radius * Math.sin(segmentEndRad);
          const segmentLargeArc = segmentEndAngle - segment.startAngle > 180 ? 1 : 0;
          
          const segmentPath = progress > 0 ? `
            M ${maxRadius} ${maxRadius}
            L ${x1} ${y1}
            A ${radius} ${radius} 0 ${segmentLargeArc} 1 ${segmentX2} ${segmentY2}
            Z
          ` : '';

          return (
            <g key={i}>
              <path
                d={segmentPath}
                fill={segment.color}
                opacity={0.9}
              />
            </g>
          );
        })}

        {/* 中心白色圆 */}
        <circle
          cx={maxRadius}
          cy={maxRadius}
          r={maxRadius - strokeWidth - 20}
          fill="#0f0f23"
        />

        {/* 中心总数 */}
        <text
          x={maxRadius}
          y={maxRadius - 20}
          textAnchor="middle"
          fill="white"
          fontSize="24"
          fontWeight="bold"
          opacity={interpolate(frame, [100, 120], [0, 1])}
        >
          总计
        </text>
        <text
          x={maxRadius}
          y={maxRadius + 40}
          textAnchor="middle"
          fill={primaryColor}
          fontSize="48"
          fontWeight="bold"
          opacity={interpolate(frame, [100, 120], [0, 1])}
        >
          {total}
        </text>
      </svg>

      {/* 图例 */}
      <div
        style={{
          position: 'absolute',
          bottom: 80,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: 40,
        }}
      >
        {segments.map((segment, i) => {
          const delay = 120 + i * 10;
          const opacity = interpolate(frame, [delay, delay + 20], [0, 1]);
          const y = interpolate(frame, [delay, delay + 20], [20, 0], { easing: Easing.out(Easing.ease) });
          
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                opacity,
                transform: `translateY(${y}px)`,
              }}
            >
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 4,
                  background: segment.color,
                }}
              />
              <div>
                <div
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'white',
                  }}
                >
                  {segment.percentage}%
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.6)',
                  }}
                >
                  {segment.label}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
