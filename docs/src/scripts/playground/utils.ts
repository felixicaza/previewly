export function formatSVG(svg: string) {
  let depth = 0

  return svg
    .replace(/></g, '>\n<')
    .split('\n')
    .map((line) => {
      const trimmedLine = line.trim()
      if (trimmedLine.startsWith('</')) depth -= 1

      const formattedLine = `${'  '.repeat(Math.max(depth, 0))}${trimmedLine}`

      if (
        trimmedLine.startsWith('<') &&
        !trimmedLine.startsWith('</') &&
        !trimmedLine.startsWith('<?') &&
        !trimmedLine.endsWith('/>') &&
        !trimmedLine.includes('</')
      ) {
        depth += 1
      }

      return formattedLine
    })
    .join('\n')
}
