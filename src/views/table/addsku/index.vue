<template>
  <div class="sku_wrapper">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="接口名称">
        <el-input
          placeholder="请输入接口名称"
          v-model="form.name"
          type="text"
          style="width: 30%"
        ></el-input>
      </el-form-item>
      <el-form-item label="描述">
        <el-input
          v-model="form.description"
          type="textarea"
          placeholder="请输入描述"
          maxlength="30"
          show-word-limit
        ></el-input>
      </el-form-item>
      <el-form-item label="请求方法">
        <el-select pl v-model="form.method" placeholder="请选择请求方法">
          <el-option label="GET" value="GET"></el-option>
          <el-option label="POST" value="POST"></el-option>
          <el-option label="PUT" value="PUT"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="URL">
        <el-input v-model="form.url" placeholder="请输入url地址"></el-input>
      </el-form-item>
      <el-form-item label="请求参数">
        <el-input
          v-model="form.requestParam"
          placeholder="请输入请求参数"
          type="textarea"
          rows="20"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="请求头">
        <el-input
          v-model="form.requestHeader"
          placeholder="请输入请求头"
          type="textarea"
          rows="20"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="响应头">
        <el-input
          v-model="form.responseHeader"
          placeholder="请输入响应头"
          type="textarea"
          rows="20"
          autosize
        ></el-input>
      </el-form-item>
      <el-form-item label="状态">
        <el-input v-model="form.status" style="width: 5%" disabled></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="default" @click="saveDate"
          >保存</el-button
        >
        <el-button type="primary" size="default" @click="cancel"
          >取消</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: "",
        description: "",
        method: "",
        url: "",
        requestHeader: "",
        responseHeader: "",
        requestParam: "",
        status: 0,
      },
    };
  },
  methods: {
    async saveDate() {
      console.log(this.form);
       const res = await this.$Api.reqAddOrUpdataInterface(this.form);
        if (res.code == "20000"&&this.form.id) {
          this.$message({
            type:"success",
            message:'修改成功'
          });
        }else{
           this.$message({
            type:"success",
            message:'添加成功'
          });
        }
      this.$parent.addMsg();
    },
    cancel() {
      this.$parent.addMsg();
    },
    getInterfaceInfo(row) {
      this.form = Object.assign(this.form,row);
    },
  },
};
</script>

<style lang='scss'>
.sku_wrapper {
  padding: 30px 30px 0 30px;
}
</style>