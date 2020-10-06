import isEqual from 'lodash/isEqual'
import isDeepEqual from 'deep-equal'

const arePropsEqual = (prevProps, nextProps) => {
  const { style: prevStyle, ...prevOther } = prevProps
  const { style: nextStyle, ...nextOther } = nextProps

  if (prevStyle || nextStyle) {
    return isDeepEqual(prevStyle, nextStyle) && isEqual(prevOther, nextOther)
  }

  return isEqual(prevOther, nextOther)
}

export default {
  arePropsEqual,
}
