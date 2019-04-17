export const groupComboIds = (combos) => 
  combos.reduce((acc, combo) => {
    const comboGroupId = combo.comboGroupId
    const id = combo.id

    if (!acc[comboGroupId]) {
      acc[comboGroupId] = [id]
    } else {
      acc[comboGroupId].push(id)
    }

    return acc
  }, {})
