<template>
     <div class="main-content">
          <div class="center">
               <vs-alert closable v-model="active" style="margin-bottom: 7px;">
                    <template #title>
                    Warning!
                    </template>
                    You can only edit and delete the food you added earlier. Except for the <b>admin</b> is free to do it.
               </vs-alert>
                         <vs-button style="margin-bottom: 10px;" primary v-on:click="addFood">Add Food</vs-button>
               <vs-table striped>
                    <template #header>
                         <vs-input v-model="search" border placeholder="Search" />
                    </template>
                    <template #thead>
                         <vs-tr>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'id')" style="width:3%">
                         ID
                         </vs-th>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'name')">
                         Name
                         </vs-th>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'description')">
                         Description
                         </vs-th>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'price')">
                         Price
                         </vs-th>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'status')">
                         Status
                         </vs-th>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'authorId')">
                         Author
                         </vs-th>
                         <vs-th sort @click="datafoods = $vs.sortData($event ,datafoods, 'categoryId')">
                         Category
                         </vs-th>
                         </vs-tr>
                    </template>
                    <template #tbody>
                         <vs-tr
                         :key="i"
                         v-for="(tr, i) in $vs.getSearch(datafoods, search)"
                         :data="tr"
                         >
                              <vs-td>{{ tr.id }}</vs-td>
                              <vs-td>{{ tr.name }}</vs-td>
                              <vs-td>{{ tr.description }}</vs-td>
                              <vs-td>$ {{ tr.price }}</vs-td>
                              <vs-td edit @click="edit = tr, editProp = 'status', editActive = true">{{ tr.status }}</vs-td>
                              <vs-td>{{ tr.User.name }}</vs-td>
                              <vs-td>{{ tr.Category.name }}</vs-td>
                              <template #expand>
                                   <div class="con-content">
                                        <div class="content-item">
                                        <vs-avatar>
                                             <img :src="`${ tr.imgUrl }`" alt="" width="30px" height="30px">
                                        </vs-avatar>
                                        <p style="margin-left:20px; padding:10px;">
                                             {{ tr.name }}
                                        </p>
                                        </div>
                                        <div class="content-item">
                                             <div>
                                                  <vs-button primary relief v-on:click.prevent="editFood(tr.id)">
                                                       Edit Food
                                                  </vs-button>
                                             </div>
                                             <div>
                                                  <vs-button border danger v-on:click.prevent="deleteFood(tr.id)">
                                                       Delete Food
                                                  </vs-button>
                                             </div>
                                        </div>
                                   </div>
                              </template>
                         </vs-tr>
                    </template>
               </vs-table>
               <!-- Popup dialog edit status -->
               <vs-dialog v-model="editActive">
                    <template #header>
                         Change food {{ editProp }}
                    </template>
                    <vs-select @change="editActive = false" block v-if="editProp == 'status'" placeholder="status" v-model="edit[editProp]">
                         <vs-option label="Active" value="active">
                         Active
                         </vs-option>
                         <vs-option label="Pending" value="pending">
                         Pending
                         </vs-option>
                         <vs-option label="Archive" value="archive">
                         Archive
                         </vs-option>
                    </vs-select>
               </vs-dialog>
               <!-- End popup edit status -->
          </div>
</template>

<script>
export default {
     name: "TableFood",
     props: ["foods"],
     computed: {
          datafoods() {
               if (this.edit !== null) {
                    this.$emit("eventFoodUpdate", {
                         id : this.edit.id,
                         status: this.edit.status
                    });
               }
               return this.foods
          },
     },
     created() {
          this.active = true;
     },
     data () {
          return {
               active: true,
               editActive: false,
               edit: null,
               editProp: {},
               search: '',
               allCheck: false,
               page: 1,
               max: 3,
               active: 0,
               selected: [],
               editActive: false,
          }
     },
     methods: {
          editFood(id) {
               this.$emit("eventEditItem", id);
          },
          deleteFood(id) {
               this.$emit("eventDeleteItem", id);
          },
          addFood() {
               this.$emit("eventAddItem", "add-food");
          }
     }
}
</script scoped>
<style scoped>
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
     .con-content{
          display: flex;
          justify-content: space-between;
     }
     .content-item {
          display: flex;
     }
</style>