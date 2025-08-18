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
                v-hasPerm="['aioveuDepartment:aioveu-department:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.deptId)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuDepartment:aioveu-department:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.deptId)"
            >
              <template #icon><Delete /></template>
              删除此行
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
                <el-form-item label="部门名称" prop="deptName">
                      <el-input
                          v-model="formData.deptName"
                          placeholder="部门名称"
                      />
                </el-form-item>

                <el-form-item label="上级部门ID" prop="parentDeptId">
                      <el-input
                          v-model="formData.parentDeptId"
                          placeholder="上级部门ID"
                      />
                </el-form-item>

                <el-form-item label="部门经理" prop="managerId">
                      <el-input
                          v-model="formData.managerId"
                          placeholder="部门经理"
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

  import AioveuDepartmentAPI, { AioveuDepartmentPageVO, AioveuDepartmentForm, AioveuDepartmentPageQuery } from "@/api/aioveuDepartment/aioveu-department";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  //removeIds数组处理有问题  正确声明 removeIds 类型
  //更安全的声明（如果数据可能不完整）
  const removeIds = ref<Array<number | undefined>>([]); // 允许包含 undefined
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
  const formData = reactive<AioveuDepartmentForm>({
    deptId: undefined, // 明确初始化
    deptName: '',
    parentDeptId: undefined,
    managerId: undefined,
  });

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
  //（确保正确提取 ID）
// 修复后 - 使用正确的属性名称 deptId  添加类型安全过滤
  function handleSelectionChange(selection: AioveuDepartmentPageVO[]) {
    // removeIds.value = selection.map(item => item.deptId);  // 如果 deptId 可能是 undefined，这就是问题 // 确保只提取有效的 deptId，过滤掉 undefined 或 null
    removeIds.value = selection
      .map(item => item.deptId)
      .filter((deptId): deptId is number => deptId !== undefined && deptId !== null) as number[];

  }

  /** 打开公司部门组织结构弹窗 */
  function handleOpenDialog(deptId?: number) {
    dialog.visible = true;
    if (deptId) {
      dialog.title = "修改公司部门组织结构";
            AioveuDepartmentAPI.getFormData(deptId).then((data) => {
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
        const id = formData.deptId;  // 从 formData 获取 deptId
        if (id) {  // 检查 deptId 是否有值
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

    // 重置表单数据 - 确保包含所有字段
    Object.assign(formData, {
      deptId: undefined,
      deptName: '',
      parentDeptId: undefined,
      managerId: undefined,
      // 其他字段...
    });

    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    formData.deptId = undefined;  // 确保 formData 初始化中包含了 deptId
  }

  /** 删除公司部门组织结构 */
  /** 顶部"删除"按钮
   *  行内"删除此行"按钮
   *
   * */

  function handleDelete(id?: number) {
    // const ids = [id || removeIds.value].join(",");
    // 当使用顶部删除按钮时：
//   id = undefined → [removeIds.value] → 例如 [[101,102]] → join后变成"101,102"
// 但当单选时：
//   removeIds.value = [101] → [[101]] → join后变成"101" ✅ 看似正常
// 实际问题是：当通过行内删除按钮调用时：
//   handleDelete(101) → [101] → join后变成"101" ✅
//
// 真正的问题是：removeIds.value 在单选时未正确赋值（见下条）


    // 重构 ids 生成逻辑：使用 id 参数 或 已选的多个 ID
    const ids = id
      ? String(id)  // 处理单行删除
      : removeIds.value.join(",");  // 处理多行删除 （使用已选 ID 数组）

    // 添加更严格的空值检查
    if (!ids || ids.trim() === "") {
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
