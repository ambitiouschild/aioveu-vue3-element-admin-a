<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="物资ID" prop="id">
                      <el-input
                          v-model="queryParams.id"
                          placeholder="物资ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="物资名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="物资名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="分类ID" prop="categoryId">
                      <el-input
                          v-model="queryParams.categoryId"
                          placeholder="分类ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="启用状态" prop="isActive">
                      <el-input
                          v-model="queryParams.isActive"
                          placeholder="启用状态"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="商品条码" prop="barcode">
                      <el-input
                          v-model="queryParams.barcode"
                          placeholder="商品条码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">
            <template #icon><Search /></template>
            搜索
          </el-button>
          <el-button @click="handleResetQuery">
            <template #icon><Refresh /></template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-10px">
        <el-button
            v-hasPerm="['aioveuMaterial:aioveu-material:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuMaterial:aioveu-material:delete']"
            type="danger"
            :disabled="removeIds.length === 0"
            @click="handleDelete()"
        >
          <template #icon><Delete /></template>
          删除
        </el-button>
      </div>

      <el-table
          ref="dataTableRef"
          v-loading="loading"
          :data="pageData"
          highlight-current-row
          border
          @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
                    <el-table-column
                        key="id"
                        label="物资ID"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="物资名称"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="categoryId"
                        label="分类ID"
                        prop="categoryId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="unit"
                        label="单位"
                        prop="unit"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="spec"
                        label="规格型号"
                        prop="spec"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="purchasePrice"
                        label="采购单价"
                        prop="purchasePrice"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="supplierId"
                        label="供应商ID"
                        prop="supplierId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="minStock"
                        label="最低库存量"
                        prop="minStock"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="maxStock"
                        label="最高库存量"
                        prop="maxStock"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column label="启用状态" width="150" align="center">
                      <template #default="scope">
                        <DictLabel v-model="scope.row.isActive" code="gender" />
                      </template>
                    </el-table-column>
                    <el-table-column
                        key="barcode"
                        label="商品条码"
                        prop="barcode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="createTime"
                        label="创建时间"
                        prop="createTime"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="updateTime"
                        label="更新时间"
                        prop="updateTime"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuMaterial:aioveu-material:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuMaterial:aioveu-material:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.id)"
            >
              <template #icon><Delete /></template>
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <pagination
          v-if="total > 0"
          v-model:total="total"
          v-model:page="queryParams.pageNum"
          v-model:limit="queryParams.pageSize"
          @pagination="handleQuery()"
      />
    </el-card>

    <!-- 物资表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="物资名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="物资名称"
                      />
                </el-form-item>

                <el-form-item label="分类ID" prop="categoryId">
                      <el-input
                          v-model="formData.categoryId"
                          placeholder="分类ID"
                      />
                </el-form-item>

                <el-form-item label="采购单价" prop="purchasePrice">
                      <el-input
                          v-model="formData.purchasePrice"
                          placeholder="采购单价"
                      />
                </el-form-item>

                <el-form-item label="供应商ID" prop="supplierId">
                      <el-input
                          v-model="formData.supplierId"
                          placeholder="供应商ID"
                      />
                </el-form-item>

                <el-form-item label="最低库存量" prop="minStock">
                      <el-input
                          v-model="formData.minStock"
                          placeholder="最低库存量"
                      />
                </el-form-item>

                <el-form-item label="最高库存量" prop="maxStock">
                      <el-input
                          v-model="formData.maxStock"
                          placeholder="最高库存量"
                      />
                </el-form-item>

                <el-form-item label="启用状态" prop="isActive">
                      <el-input
                          v-model="formData.isActive"
                          placeholder="启用状态"
                      />
                </el-form-item>

                <el-form-item label="商品条码" prop="barcode">
                      <el-input
                          v-model="formData.barcode"
                          placeholder="商品条码"
                      />
                </el-form-item>

      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button type="primary" @click="handleSubmit()">确定</el-button>
          <el-button @click="handleCloseDialog()">取消</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
  defineOptions({
    name: "AioveuMaterial",
    inheritAttrs: false,
  });

  import AioveuMaterialAPI, { AioveuMaterialPageVO, AioveuMaterialForm, AioveuMaterialPageQuery } from "@/api/aioveuMaterial/aioveu-material";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuMaterialPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 物资表格数据
  const pageData = ref<AioveuMaterialPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 物资表单数据
  const formData = reactive<AioveuMaterialForm>({});

  // 物资表单校验规则
  const rules = reactive({
                      name: [{ required: true, message: "请输入物资名称", trigger: "blur" }],
                      categoryId: [{ required: true, message: "请输入分类ID", trigger: "blur" }],
                      purchasePrice: [{ required: true, message: "请输入采购单价", trigger: "blur" }],
                      isActive: [{ required: true, message: "请输入启用状态", trigger: "blur" }],
                      barcode: [{ required: true, message: "请输入商品条码", trigger: "blur" }],
  });

  /** 查询物资 */
  function handleQuery() {
    loading.value = true;
          AioveuMaterialAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置物资查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  // 在组件中添加一个变量存储当前编辑的ID
  const editingMaterialId = ref<number | undefined>(undefined);

  /** 打开物资弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;

    editingMaterialId.value = id; // 保存ID

    if (id) {
      dialog.title = "修改物资";
            AioveuMaterialAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增物资";
    }
  }

  /** 提交物资表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = editingMaterialId.value;  // 使用存储的ID
        if (id) {
                AioveuMaterialAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuMaterialAPI.add(formData)
              .then(() => {
                ElMessage.success("新增成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        }
      }
    });
  }

  /** 关闭物资弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;

    // 关键修复：在关闭弹窗时重置加载状态
    loading.value = false;

    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    // 清除编辑ID
    editingMaterialId.value = undefined;
  }

  /** 删除物资 */
  function handleDelete(id?: number) {
    const ids = [id || removeIds.value].join(",");
    if (!ids) {
      ElMessage.warning("请勾选删除项");
      return;
    }

    ElMessageBox.confirm("确认删除已选中的数据项?", "警告", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    }).then(
        () => {
          loading.value = true;
                AioveuMaterialAPI.deleteByIds(ids)
              .then(() => {
                ElMessage.success("删除成功");
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        },
        () => {
          ElMessage.info("已取消删除");
        }
    );
  }

  onMounted(() => {
    handleQuery();
  });
</script>
