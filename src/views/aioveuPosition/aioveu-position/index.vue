<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="岗位ID" prop="positionId">
                      <el-input
                          v-model="queryParams.positionId"
                          placeholder="岗位ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="岗位名称" prop="positionName">
                      <el-input
                          v-model="queryParams.positionName"
                          placeholder="岗位名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="所属部门ID" prop="deptId">
                      <el-input
                          v-model="queryParams.deptId"
                          placeholder="所属部门ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="职级(1-10)" prop="positionLevel">
                      <el-input
                          v-model="queryParams.positionLevel"
                          placeholder="职级(1-10)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="岗位描述" prop="description">
                      <el-input type="textarea"
                                v-model="queryParams.description"
                                placeholder="岗位描述"
                      />
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                      <el-date-picker
                          v-model="queryParams.createTime"
                          type="datetime"
                          placeholder="创建时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
                      />
                </el-form-item>
                <el-form-item label="更新时间" prop="updateTime">
                      <el-date-picker
                          v-model="queryParams.updateTime"
                          type="datetime"
                          placeholder="更新时间"
                          value-format="YYYY-MM-DD HH:mm:ss"
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
            v-hasPerm="['aioveuPosition:aioveu-position:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuPosition:aioveu-position:delete']"
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
                        key="positionId"
                        label="岗位ID"
                        prop="positionId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="positionName"
                        label="岗位名称"
                        prop="positionName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deptId"
                        label="所属部门ID"
                        prop="deptId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="positionLevel"
                        label="职级(1-10)"
                        prop="positionLevel"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="description"
                        label="岗位描述"
                        prop="description"
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
                v-hasPerm="['aioveuPosition:aioveu-position:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.positionId)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuPosition:aioveu-position:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.positionId)"
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

    <!-- 公司岗位信息表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="岗位名称" prop="positionName">
                      <el-input
                          v-model="formData.positionName"
                          placeholder="岗位名称"
                      />
                </el-form-item>

                <el-form-item label="所属部门ID" prop="deptId">
                      <el-input
                          v-model="formData.deptId"
                          placeholder="所属部门ID"
                      />
                </el-form-item>

                <el-form-item label="职级(1-10)" prop="positionLevel">
                      <el-input
                          v-model="formData.positionLevel"
                          placeholder="职级(1-10)"
                      />
                </el-form-item>

                <el-form-item label="岗位描述" prop="description">
                      <el-input type="textarea"
                                v-model="formData.description"
                                placeholder="岗位描述"
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
    name: "AioveuPosition",
    inheritAttrs: false,
  });

  import AioveuPositionAPI, { AioveuPositionPageVO, AioveuPositionForm, AioveuPositionPageQuery } from "@/api/aioveuPosition/aioveu-position";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuPositionPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 公司岗位信息表格数据
  const pageData = ref<AioveuPositionPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 公司岗位信息表单数据
  const formData = reactive<AioveuPositionForm>({
    /** 岗位名称 */
    positionName:  '',
    /** 所属部门ID */
    deptId:  undefined,
    /** 职级(1-10) */
    positionLevel:  undefined,
    /** 岗位描述 */
    description:  undefined


  });

  // 公司岗位信息表单校验规则
  const rules = reactive({
                      positionName: [{ required: true, message: "请输入岗位名称", trigger: "blur" }],
  });

  /** 查询公司岗位信息 */
  function handleQuery() {
    loading.value = true;
          AioveuPositionAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置公司岗位信息查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: AioveuPositionPageVO[]) {
    removeIds.value = selection
      .map(item => item.positionId)
      .filter((positionId): positionId is number => positionId !== undefined && positionId !== null) as number[];
  }

  // 在组件中添加一个变量存储当前编辑的positionId
  const editingpositionId = ref<number | undefined>(undefined);

  /** 打开公司岗位信息弹窗 */
  function handleOpenDialog(positionId?: number) {
    dialog.visible = true;
    editingpositionId.value = positionId; // 保存员工ID

    if (positionId) {
      dialog.title = "修改公司岗位信息";
            AioveuPositionAPI.getFormData(positionId).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增公司岗位信息";
    }
  }

  /** 提交公司岗位信息表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = editingpositionId.value; // 使用存储的positionId
        if (id) {
                AioveuPositionAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuPositionAPI.add(formData)
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

  /** 关闭公司岗位信息弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    editingpositionId.value = undefined; // 清除positionId
  }

  /** 删除公司岗位信息 */
  function handleDelete(positionId?: number) {
    const ids = [positionId || removeIds.value].join(",");
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
                AioveuPositionAPI.deleteByIds(ids)
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
