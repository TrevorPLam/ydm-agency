export class AttributionModel {
  static lastClick(touchpoints: Touchpoint[]): string {
    return touchpoints[touchpoints.length - 1].source
  }

  static firstClick(touchpoints: Touchpoint[]): string {
    return touchpoints[0].source
  }

  static linear(touchpoints: Touchpoint[]): Record<string, number> {
    const attribution: Record<string, number> = {}
    const weight = 1 / touchpoints.length

    touchpoints.forEach(tp => {
      attribution[tp.source] = (attribution[tp.source] || 0) + weight
    })

    return attribution
  }
}
