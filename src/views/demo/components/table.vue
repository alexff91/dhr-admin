<template>
    <div>
        <div class="heading">
            <h1 class="title">Table</h1>
        </div>
        <el-table :data="temp" @selection-change="handleSelectionChange" @filter-change="handleFilterChange">
            <el-table-column type="selection" />
            <el-table-column label="Date" width="160">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="Name" width="160"
                             :filters="[{ text: 'Ololosho', value: 'Ololosho' }, { text: 'Ololosho', value: 'Ololosho' }]" />
            <el-table-column prop="address" label="Address" show-overflow-tooltip />
        </el-table>
    </div>
</template>

<script>
export default {
  name: 'components-table',

  data () {
    const temp = []
    for (let i = 0; i < 100; i++) {
      temp.push({
        date: new Date().toLocaleDateString(),
        name: i % 2 ? 'Ololosho' : 'Ololosho',
        address: `Ololosho ${i} Ololosho`
      })
    }
    return {
      temp: temp,
      multipleSelection: []
    }
  },

  methods: {
    handleSelectionChange (value) {
      this.multipleSelection = value
    },
    handleFilterChange (value) {
      console.log(value)
    }
  }
}
</script>
