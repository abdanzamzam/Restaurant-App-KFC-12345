<template>
  <div class="main-content">
          <div class="center">
               <vs-table striped>
                    <template #header>
                         <vs-input v-model="search" border placeholder="Search" />
                    </template>
                    <template #thead>
                         <vs-tr>
                              <vs-th sort @click="dataHistories = $vs.sortData($event ,dataHistories, 'id')" style="width:8%">
                              ID
                              </vs-th>
                              <vs-th sort @click="dataHistories = $vs.sortData($event ,dataHistories, 'name')">
                              Name Food
                              </vs-th>
                              <vs-th sort @click="dataHistories = $vs.sortData($event ,dataHistories, 'description')" style="width:50%">
                              Description
                              </vs-th>
                              <vs-th sort @click="dataHistories = $vs.sortData($event ,dataHistories, 'updatedBy')">
                              Updated By
                              </vs-th>
                         </vs-tr>
                    </template>
                    <template #tbody>
                         <vs-tr
                         :key="i"
                         v-for="(tr, i) in $vs.getSearch(dataHistories, search)"
                         :data="tr"
                         >
                              <vs-td>
                              {{ tr.id }}
                              </vs-td>
                              <vs-td>
                              {{ tr.name }}
                              </vs-td>
                              <vs-td>
                              {{ tr.description }}
                              </vs-td>
                              <vs-td>
                              {{ tr.User.name }}
                              </vs-td>
                         </vs-tr>
                    </template>
               </vs-table>
          </div>
     </div>
</template>

<script>
export default {
     name: "TableHistory",
     props: ["histories"],
     computed: {
          dataHistories: function () {
               return this.histories;
          }
     },
     data() {
          return {
               search: ""
          }
     }
}
</script>

<style>

</style>