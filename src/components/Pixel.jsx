/**
 * 도트 UI 프리미티브.
 * 스타일은 전부 src/styles/pixel.css 에 있고 여기서는 클래스만 조합한다.
 */

const cx = (...parts) => parts.filter(Boolean).join(' ')

export function Box({ title, right, raised, thick, className, children, ...rest }) {
  return (
    <section
      className={cx('box', raised && 'box-raised', thick && 'box-thick', className)}
      {...rest}
    >
      {title && (
        <header className="box-head">
          <span>{title}</span>
          {right && <span className="t-tiny">{right}</span>}
        </header>
      )}
      {children}
    </section>
  )
}

export function Btn({ solid, block, size, className, children, ...rest }) {
  return (
    <button
      type="button"
      className={cx(
        'btn',
        solid && 'btn-solid',
        block && 'btn-block',
        size === 'lg' && 'btn-lg',
        size === 'sm' && 'btn-sm',
        size === 'ghost' && 'btn-ghost btn-sm',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Badge({ solid, children }) {
  return <span className={cx('badge', solid && 'badge-solid')}>{children}</span>
}

/**
 * 도트 칸으로 그리는 진행 바. 칸 수는 최대 20개로 제한한다.
 * (100문제짜리라도 칸이 1px 이 되면 도트가 아니라 그냥 선이 된다)
 */
export function Bar({ value, max, cells }) {
  const count = cells ?? Math.min(Math.max(max, 1), 20)
  const filled = max === 0 ? 0 : Math.round((value / max) * count)
  return (
    <div
      className="bar"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
    >
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={cx('bar-cell', i < filled && 'on')} />
      ))}
    </div>
  )
}

export function Divider({ dashed }) {
  return <hr className={dashed ? 'hr-dot' : 'hr'} />
}

export function CodeBlock({ lang, children }) {
  return (
    <div>
      {lang && <div className="code-head">{lang.toUpperCase()}</div>}
      <pre className="code">{children}</pre>
    </div>
  )
}

/** 흑백만으로 농도를 표현하는 칩. level: 0 | 25 | 50 | 75 | 100 */
export function Swatch({ level = 0, className, ...rest }) {
  return <span className={cx(`dither-${level}`, className)} {...rest} />
}

export { cx }
