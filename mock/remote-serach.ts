import Mock from 'mockjs'

const NameList: { name: string }[] = []
const count = 100

for (let i = 0; i < count; i++) {
  NameList.push(
    Mock.mock({
      name: '@first',
    })
  )
}
NameList.push({ name: 'mock-Pan' })

export default [
  // username search
  {
    url: '/search/user',
    type: 'get',
    response: (config: any) => {
      const { name } = config.query
      const mockNameList = NameList.filter(item => {
        const lowerCaseName = item.name.toLowerCase()
        return !(name && lowerCaseName.indexOf(name.toLowerCase()) < 0)
      })
      return {
        code: 200,
        data: { items: mockNameList },
      }
    },
  },

  // transaction list
  {
    url: '/transaction/list',
    type: 'get',
    response: (_: any) => {
      return {
        code: 200,
        data: {
          total: 20,
          'items|20': [
            {
              order_no: '@guid()',
              timestamp: +Mock.Random.date('T'),
              username: '@name()',
              price: '@float(1000, 15000, 0, 2)',
              'status|1': ['success', 'pending'],
            },
          ],
        },
      }
    },
  },
]
