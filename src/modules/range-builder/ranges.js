const buildRanges = () => {
  const names = ['red', 'blue', 'green', 'yellow', 'purple']

  return names.reduce((acc, name) => {
    acc[name] = {
      name,
      color: name,
      selectedComboIds: []
    }

    return acc
  }, {})
}

export const ranges = buildRanges()