import React, { useCallback } from 'react'
import PT from 'prop-types'

import map from 'lodash/map'

import Utils from 'utils'

import { Container, TabItem, ItemSeparator } from './styles'

const TabBar = ({ tabs, activeId, isFluid }) => {
  const renderTab = useCallback(
    (tabItem) => {
      return (
        <TabItem
          {...{ isFluid }}
          key={tabItem.id}
          tab={tabItem}
          isActive={tabItem.id === activeId}
        />
      )
    },
    [activeId, isFluid],
  )

  const renderItemSeparator = useCallback(({ id }) => {
    return <ItemSeparator key={`tabListSeparator-${id}`} />
  }, [])

  const tabListEl = Utils.Presentational.getListWithSeparators({
    list: map(tabs, renderTab),
    renderSeparator: renderItemSeparator,
  })

  return <Container>{tabListEl}</Container>
}

TabBar.propTypes = {
  activeId: PT.string.isRequired,
  isFluid: PT.bool,
  tabs: PT.array.isRequired,
}

TabBar.defaultProps = {
  isFluid: true,
}

export { TabBar }

// import React, { Component } from 'react'
// import { UIManager, LayoutAnimation } from 'react-native'
// import PT from 'prop-types'

// import map from 'lodash/map'

// import PickingService from 'services/picking'

// import { ViewPropTypes, StyledPropTypes } from 'constants/propTypes'

// import { Container, TabItem } from './styles'

// class TabBar extends Component {
//   componentWillReceiveProps(nextProps) {
//     if (this.props.navigationState.index !== nextProps.navigationState.index) {
//       this.prepareAnimation()
//     }
//   }

//   prepareAnimation = () => {
//     PickingService.platformLazy({
//       android: () => {
//         if (UIManager.setLayoutAnimationEnabledExperimental) {
//           UIManager.setLayoutAnimationEnabledExperimental(true)
//         }
//       },
//     })

//     LayoutAnimation.configureNext({
//       duration: 400,
//       create: { type: 'linear', property: 'opacity' },
//       update: { type: 'spring', springDamping: 0.75 },
//       delete: { type: 'linear', property: 'opacity' },
//     })
//   }

//   handleTabPress = route => {
//     const { jumpTo } = this.props

//     this.prepareAnimation()

//     jumpTo(route.key)
//   }

//   handleTabInfoPress = route => {
//     route.onInfoPress(route)
//   }

//   renderTab = route => {
//     const { navigationState, variant } = this.props

//     return (
//       <TabItem
//         key={route.key}
//         route={route}
//         navigationState={navigationState}
//         variant={variant}
//         onPress={this.handleTabPress}
//         onInfoPress={this.handleTabInfoPress}
//       />
//     )
//   }

//   render() {
//     const { navigationState, style } = this.props
//     const tabList = map(navigationState.routes, this.renderTab)

//     return <Container style={style}>{tabList}</Container>
//   }
// }

// TabBar.propTypes = {
//   jumpTo: PT.func.isRequired,
//   navigationState: PT.object.isRequired,
//   style: ViewPropTypes.style,
//   variant: StyledPropTypes.variant.isRequired,
// }

// TabBar.defaultProps = {
//   style: {},
// }

// export default TabBar
