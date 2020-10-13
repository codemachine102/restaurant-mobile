import React, { useCallback } from 'react'
import PT from 'prop-types'

import map from 'lodash/map'

import Utils from 'utils'

import { Container, TabItem, ItemSeparator } from './styles'

const TabBar = ({ tabs, activeId, isFluid, onTabChange }) => {
  const renderTab = useCallback(
    (tabItem) => {
      return (
        <TabItem
          {...{ isFluid }}
          key={tabItem.id}
          tab={tabItem}
          isActive={tabItem.id === activeId}
          onChange={onTabChange}
        />
      )
    },
    [activeId, isFluid, onTabChange],
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
  onTabChange: PT.func.isRequired,
}

TabBar.defaultProps = {
  isFluid: true,
}

export { TabBar }
