<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="设备ID" prop="id">
                      <el-input
                          v-model="queryParams.id"
                          placeholder="设备ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="资产编号" prop="assetNo">
                      <el-input
                          v-model="queryParams.assetNo"
                          placeholder="资产编号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="设备名称" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="设备名称"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="设备分类ID" prop="categoryId">
                      <el-input
                          v-model="queryParams.categoryId"
                          placeholder="设备分类ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="序列号" prop="serialNo">
                      <el-input
                          v-model="queryParams.serialNo"
                          placeholder="序列号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="责任人" prop="responsiblePerson">
                      <el-input
                          v-model="queryParams.responsiblePerson"
                          placeholder="责任人"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="状态" prop="status">
                      <el-input
                          v-model="queryParams.status"
                          placeholder="状态"
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
            v-hasPerm="['aioveuEquipment:aioveu-equipment:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuEquipment:aioveu-equipment:delete']"
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
                        label="设备ID"
                        prop="id"
                        min-width="150"
                        align="center"
                        fixed="left"
                    />
                    <el-table-column
                        key="assetNo"
                        label="资产编号"
                        prop="assetNo"
                        min-width="150"
                        align="center"
                        fixed="left"
                    />
                    <el-table-column
                        key="name"
                        label="设备名称"
                        prop="name"
                        min-width="150"
                        align="center"
                        fixed="left"
                    />
                    <el-table-column
                      key="categoryName"
                      label="设备分类"
                      prop="categoryName"
                      min-width="150"
                      align="center"
                    />
                    <el-table-column
                        key="model"
                        label="设备型号"
                        prop="model"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="serialNo"
                        label="序列号"
                        prop="serialNo"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="locationId"
                        label="位置ID"
                        prop="locationId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="departmentId"
                        label="所属部门ID"
                        prop="departmentId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="responsiblePersonName"
                        label="责任人"
                        prop="responsiblePersonName"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="purchaseDate"
                        label="采购日期"
                        prop="purchaseDate"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="purchasePrice"
                        label="采购价格"
                        prop="purchasePrice"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="warrantyPeriod"
                        label="保修期（月）"
                        prop="warrantyPeriod"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="maintenanceCycle"
                        label="维保周期（月）"
                        prop="maintenanceCycle"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="lastMaintenance"
                        label="上次维保日期"
                        prop="lastMaintenance"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="nextMaintenance"
                        label="下次维保日期"
                        prop="nextMaintenance"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                      label="设备状态"
                      min-width="150"
                      align="center"
                    >
                      <template #default="scope">
                        <DictLabel v-model="scope.row.status" code="equipment_status" />
                      </template>
                    </el-table-column>

                    <el-table-column
                        key="remark"
                        label="备注"
                        prop="remark"
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
                v-hasPerm="['aioveuEquipment:aioveu-equipment:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuEquipment:aioveu-equipment:delete']"
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

    <!-- 设备管理表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="资产编号" prop="assetNo">
                      <el-input
                          v-model="formData.assetNo"
                          placeholder="资产编号"
                      />
                </el-form-item>

                <el-form-item label="设备名称" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="设备名称"
                      />
                </el-form-item>

                <el-form-item label="设备分类ID" prop="categoryId">
                      <el-input
                          v-model="formData.categoryId"
                          placeholder="设备分类ID"
                      />
                </el-form-item>

                <el-form-item label="设备型号" prop="model">
                      <el-input
                          v-model="formData.model"
                          placeholder="设备型号"
                      />
                </el-form-item>

                <el-form-item label="序列号" prop="serialNo">
                      <el-input
                          v-model="formData.serialNo"
                          placeholder="序列号"
                      />
                </el-form-item>

                <el-form-item label="位置ID" prop="locationId">
                      <el-input
                          v-model="formData.locationId"
                          placeholder="位置ID"
                      />
                </el-form-item>

                <el-form-item label="所属部门ID" prop="departmentId">
                      <el-input
                          v-model="formData.departmentId"
                          placeholder="所属部门ID"
                      />
                </el-form-item>

                <el-form-item label="责任人" prop="responsiblePerson">
                      <el-input
                          v-model="formData.responsiblePerson"
                          placeholder="责任人"
                      />
                </el-form-item>

                <el-form-item label="采购日期" prop="purchaseDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.purchaseDate"
                          type="date"
                          placeholder="采购日期"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="采购价格" prop="purchasePrice">
                      <el-input
                          v-model="formData.purchasePrice"
                          placeholder="采购价格"
                      />
                </el-form-item>

                <el-form-item label="保修期（月）" prop="warrantyPeriod">
                      <el-input
                          v-model="formData.warrantyPeriod"
                          placeholder="保修期（月）"
                      />
                </el-form-item>

                <el-form-item label="维保周期（月）" prop="maintenanceCycle">
                      <el-input
                          v-model="formData.maintenanceCycle"
                          placeholder="维保周期（月）"
                      />
                </el-form-item>

                <el-form-item label="上次维保日期" prop="lastMaintenance">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.lastMaintenance"
                          type="date"
                          placeholder="上次维保日期"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="下次维保日期" prop="nextMaintenance">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.nextMaintenance"
                          type="date"
                          placeholder="下次维保日期"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="状态" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态"
                      />
                </el-form-item>

                <el-form-item label="备注" prop="remark">
                      <el-input
                          v-model="formData.remark"
                          placeholder="备注"
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
    name: "AioveuEquipment",
    inheritAttrs: false,
  });

  import AioveuEquipmentAPI, { AioveuEquipmentPageVO, AioveuEquipmentForm, AioveuEquipmentPageQuery } from "@/api/aioveuEquipment/aioveu-equipment";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuEquipmentPageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 设备管理表格数据
  const pageData = ref<AioveuEquipmentPageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 设备管理表单数据
  const formData = reactive<AioveuEquipmentForm>({});

  // 设备管理表单校验规则
  const rules = reactive({
                      assetNo: [{ required: true, message: "请输入资产编号", trigger: "blur" }],
                      name: [{ required: true, message: "请输入设备名称", trigger: "blur" }],
                      categoryId: [{ required: true, message: "请输入设备分类ID", trigger: "blur" }],
                      status: [{ required: true, message: "请输入状态", trigger: "blur" }],
  });

  /** 查询设备管理 */
  function handleQuery() {
    loading.value = true;
          AioveuEquipmentAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置设备管理查询 */
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
  const editingEquipmentId = ref<number | undefined>(undefined);

  /** 打开设备管理弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;

    editingEquipmentId.value = id; // 保存ID

    if (id) {
      dialog.title = "修改设备管理";
            AioveuEquipmentAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增设备管理";
    }
  }

  /** 提交设备管理表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = editingEquipmentId.value; // 使用存储的ID
        if (id) {
                AioveuEquipmentAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuEquipmentAPI.add(formData)
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

  /** 关闭设备管理弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;

    // 关键修复：在关闭弹窗时重置加载状态
    loading.value = false;

    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();

    // 清除编辑ID
    editingEquipmentId.value = undefined;
  }

  /** 删除设备管理 */
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
                AioveuEquipmentAPI.deleteByIds(ids)
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
