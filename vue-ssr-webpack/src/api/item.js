export function fetchItem (id) {
  // 模拟假数据
  return new Promise((resolve, reject) => {
    const mockItem = { id, title: `test item ${id}` }
    resolve(mockItem)
  })
}