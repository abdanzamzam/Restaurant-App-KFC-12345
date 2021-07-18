<template>
     <div class="main-content">
          <div class="center">
               <vs-table striped>
                    <template #header>
                         <vs-input v-model="search" border placeholder="Search" />
                    </template>
                    <template #thead>
                         <vs-tr>
                              <vs-th sort @click="dataCategories = $vs.sortData($event ,dataCategories, 'id')" style="width:30%">
                              ID
                              </vs-th>
                              <vs-th sort @click="dataCategories = $vs.sortData($event ,dataCategories, 'name')">
                              Name
                              </vs-th>
                         </vs-tr>
                    </template>
                    <template #tbody>
                         <vs-tr
                         :key="i"
                         v-for="(tr, i) in $vs.getSearch(dataCategories, search)"
                         :data="tr"
                         >
                              <vs-td>
                              {{ tr.id }}
                              </vs-td>
                              <vs-td>
                              {{ tr.name }}
                              </vs-td>
                         </vs-tr>
                    </template>
               </vs-table>
          </div>
     </div>
</template>

<script>
export default {
     name: "TableCategory",   
     props: ["categories"],
     computed: {
          dataCategories () {
               return this.categories;
          }
     },
     data() {
          return {
               search: '',
          }
     }
}
</script>

<style>
     .main-content {
         margin: 50px;
         margin-right: 330px;
         background-color: white;
         padding: 15px;
         border-radius: 15px;
         -webkit-box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
          -moz-box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
          box-shadow: 0px 7px 29px -22px rgba(0,0,0,0.75);
     }
</style>