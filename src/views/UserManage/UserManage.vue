<template>
  <div class="manage">
    <div class="manage-header">
      <user-form></user-form>
    </div>

    <div class="manage-content">
      <user-table></user-table>
    </div>
  </div>
</template>

<script>
import UserForm from "./UserForm";
import UserTable from "./UserTable";
export default {
  components: {
    [UserForm.name]: UserForm,
    [UserTable.name]: UserTable
  }
};
</script>

<style lang="scss" scoped>
.manage-header {
  margin-bottom: 20px;
}
</style>
