<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="部门ID" prop="deptId">
                  <el-input
                    v-model="queryParams.deptId"
                    placeholder="部门ID"
                    clearable
                    @keyup.enter="handleQuery()"
                  />

                </el-form-item>
                <el-form-item label="部门名称" prop="deptName">
                      <el-input
                          v-model="queryParams.deptName"
                          placeholder="部门名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="上级部门ID" prop="parentDeptId">
                      <el-input
                          v-model="queryParams.parentDeptId"
                          placeholder="上级部门ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="部门经理" prop="managerId">
                      <el-input
                          v-model="queryParams.managerId"
                          placeholder="部门经理"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-hasPerm="['aioveuDepartment:aioveu-department:query']"
            @click="handleQuery">
            <template #icon><Search /></template>
            搜索
          </el-button>
          <el-button
            v-hasPerm="['aioveuDepartment:aioveu-department:Resetquery']"
            @click="handleResetQuery">
            <template #icon><Refresh /></template>
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <el-card shadow="never">
      <div class="mb-10px">
        <el-button
            v-hasPerm="['aioveuDepartment:aioveu-department:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuDepartment:aioveu-department:delete']"
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
                        key="deptId"
                        label="部门ID"
                        prop="deptId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deptName"
                        label="部门名称"
                        prop="deptName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="parentDeptId"
                        label="上级部门ID"
                        prop="parentDeptId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="managerId"
                        label="部门经理"
                        prop="managerId"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuDepartment:aioveu-department:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuDepartment:aioveu-department:delete']"
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

    <!-- 公司部门组织结构表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-input type="hidden" v-model="formData.deptId" />
                <el-form-item label="部门名称" prop="deptName">
                      <el-input
                          v-model="formData.deptName"
                          placeholder="部门名称"
                      />
                </el-form-item>

                <el-form-item label="上级部门ID，用于构建部门树" prop="parentDeptId">
                      <el-input
                          v-model="formData.parentDeptId"
                          placeholder="上级部门ID，用于构建部门树"
                      />
                </el-form-item>

                <el-form-item label="部门经理，关联employee表" prop="managerId">
                      <el-input
                          v-model="formData.managerId"
                          placeholder="部门经理，关联employee表"
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
    name: "AioveuDepartment",
    inheritAttrs: false,
  });

  import AioveuDepartmentAPI, { AioveuDepartmentPageVO, AioveuDepartmentForm, AioveuDepartmentPageQuery } from '@/api/aioveuDepartment/aioveu-department';

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuDepartmentPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 公司部门组织结构表格数据
  const pageData = ref<AioveuDepartmentPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 公司部门组织结构表单数据
  const formData = reactive<AioveuDepartmentForm>({});

  // 公司部门组织结构表单校验规则
  const rules = reactive({
                      deptName: [{ required: true, message: "请输入部门名称", trigger: "blur" }],
  });

  /** 查询公司部门组织结构 */
  function handleQuery() {
    loading.value = true;
          AioveuDepartmentAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置公司部门组织结构查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: any) {
    removeIds.value = selection.map((item: any) => item.id);
  }

  /** 打开公司部门组织结构弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;
    if (id) {
      dialog.title = "修改公司部门组织结构";
            AioveuDepartmentAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增公司部门组织结构";
    }
  }

  /** 提交公司部门组织结构表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = formData.deptId;
        if (id) {
                AioveuDepartmentAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuDepartmentAPI.add(formData)
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

  /** 关闭公司部门组织结构弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.deptId = undefined;
  }

  /** 删除公司部门组织结构 */
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
                AioveuDepartmentAPI.deleteByIds(ids)
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
