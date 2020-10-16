import React, { useState } from 'react'

import { TouchableOpacity, View, StyleSheet } from 'react-native'
import PT from 'prop-types'

import { ViewPropTypes } from 'constants/propTypes'

import { Container, FieldLabel, Input } from './styles'

const styles = StyleSheet.create({
  circle: {
    height: 20,

    width: 20,

    borderRadius: 10,

    borderWidth: 1,

    borderColor: '#ACACAC',

    alignItems: 'center', // To center the checked circle…

    justifyContent: 'center',

    marginHorizontal: 10,
  },

  checkedCircle: {
    width: 14,

    height: 14,

    borderRadius: 7,

    backgroundColor: '#ffffff',
  },
})

const RadioButton = ({ value, label, onChange: onPress, ...props }) => {
  const [isChecked, setChecked] = useState(false)
  console.log(setChecked)

  return (
    <Container {...props}>
      <FieldLabel {...{ label }} />
      <TouchableOpacity style={styles.circle} onPress={onPress}>
        {isChecked ? <View style={styles.checkedCircle} /> : <View />}
      </TouchableOpacity>
      j
      <Input
        {...{
          value,
        }}
      />
    </Container>
  )
}

RadioButton.propTypes = {
  label: PT.string,
  style: ViewPropTypes.style,
  value: PT.string,
  onChange: PT.func.isRequired,
}

RadioButton.defaultProps = {
  label: null,
  style: {},
  value: '',
}

export { RadioButton }
