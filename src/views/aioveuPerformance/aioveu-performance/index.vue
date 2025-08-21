<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="绩效记录ID" prop="id">
                      <el-input
                          v-model="queryParams.id"
                          placeholder="绩效记录ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="员工ID" prop="employeeId">
                      <el-input
                          v-model="queryParams.employeeId"
                          placeholder="员工ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="考核年份" prop="periodYear">
                      <el-input
                          v-model="queryParams.periodYear"
                          placeholder="考核年份"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="考核季度(1-4)" prop="periodQuarter">
                      <el-input
                          v-model="queryParams.periodQuarter"
                          placeholder="考核季度(1-4)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="KPI评分(1-100分)" prop="kpiScore">
                      <el-input
                          v-model="queryParams.kpiScore"
                          placeholder="KPI评分(1-100分)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="生产率百分比(%)" prop="productivity">
                      <el-input
                          v-model="queryParams.productivity"
                          placeholder="生产率百分比(%)"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="创建时间" prop="createTime">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="queryParams.createTime"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>
                <el-form-item label="更新时间" prop="updateTime">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="queryParams.updateTime"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>
                <el-form-item label="绩效等级" prop="performanceGrade">
                      <el-input
                          v-model="queryParams.performanceGrade"
                          placeholder="绩效等级"
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
            v-hasPerm="['aioveuPerformance:aioveu-performance:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuPerformance:aioveu-performance:delete']"
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
                        label="绩效记录ID"
                        prop="id"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="employeeId"
                        label="员工ID"
                        prop="employeeId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="periodYear"
                        label="考核年份"
                        prop="periodYear"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="periodQuarter"
                        label="考核季度(1-4)"
                        prop="periodQuarter"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="kpiScore"
                        label="KPI评分(1-100分)"
                        prop="kpiScore"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="productivity"
                        label="生产率百分比(%)"
                        prop="productivity"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="review"
                        label="主管评语"
                        prop="review"
                        min-width="750"
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
                    <el-table-column
                        key="performanceGrade"
                        label="绩效等级"
                        prop="performanceGrade"
                        min-width="150"
                        align="center"
                    />
        <el-table-column fixed="right" label="操作" width="220">
          <template #default="scope">
            <el-button
                v-hasPerm="['aioveuPerformance:aioveu-performance:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.id)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuPerformance:aioveu-performance:delete']"
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

    <!-- 员工绩效考评表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="员工ID" prop="employeeId">
                      <el-input
                          v-model="formData.employeeId"
                          placeholder="员工ID"
                      />
                </el-form-item>

                <el-form-item label="考核年份" prop="periodYear">
                      <el-input
                          v-model="formData.periodYear"
                          placeholder="考核年份"
                      />
                </el-form-item>

                <el-form-item label="考核季度(1-4)" prop="periodQuarter">
                      <el-input
                          v-model="formData.periodQuarter"
                          placeholder="考核季度(1-4)"
                      />
                </el-form-item>

                <el-form-item label="KPI评分(1-100分)" prop="kpiScore">
                      <el-input
                          v-model="formData.kpiScore"
                          placeholder="KPI评分(1-100分)"
                      />
                </el-form-item>

                <el-form-item label="生产率百分比(%)" prop="productivity">
                      <el-input
                          v-model="formData.productivity"
                          placeholder="生产率百分比(%)"
                      />
                </el-form-item>

                <el-form-item label="主管评语" prop="review">
                      <el-input
                          v-model="formData.review"
                          placeholder="主管评语"
                      />
                </el-form-item>

<!--                <el-form-item label="绩效等级" prop="performanceGrade">-->
<!--                      <el-input-->
<!--                          v-model="formData.performanceGrade"-->
<!--                          placeholder="绩效等级"-->
<!--                      />-->
<!--                </el-form-item>-->

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
    name: "AioveuPerformance",
    inheritAttrs: false,
  });

  import AioveuPerformanceAPI, { AioveuPerformancePageVO, AioveuPerformanceForm, AioveuPerformancePageQuery } from "@/api/aioveuPerformance/aioveu-performance";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuPerformancePageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 员工绩效考评表格数据
  const pageData = ref<AioveuPerformancePageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 员工绩效考评表单数据
  const formData = reactive<AioveuPerformanceForm>({});

  // 员工绩效考评表单校验规则
  const rules = reactive({
                      employeeId: [{ required: true, message: "请输入员工ID", trigger: "blur" }],
                      periodYear: [{ required: true, message: "请输入考核年份", trigger: "blur" }],
                      periodQuarter: [{ required: true, message: "请输入考核季度(1-4)", trigger: "blur" }],
                      kpiScore: [{ required: true, message: "请输入KPI评分(1-100分)", trigger: "blur" }],
                      productivity: [{ required: true, message: "请输入生产率百分比(%)", trigger: "blur" }],
  });

  /** 查询员工绩效考评 */
  function handleQuery() {
    loading.value = true;
          AioveuPerformanceAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置员工绩效考评查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: AioveuPerformancePageVO[]) {
    removeIds.value = selection
      .map(item => item.id)
      .filter((id): id is number => id !== undefined && id !== null) as number[];
  }

  // 在组件中添加一个变量存储当前编辑的ID
  const editingPerformanceId = ref<number | undefined>(undefined);

  /** 打开员工绩效考评弹窗 */
  function handleOpenDialog(id?: number) {
    dialog.visible = true;

    editingPerformanceId.value = id; // 保存ID

    if (id) {
      dialog.title = "修改员工绩效考评";
            AioveuPerformanceAPI.getFormData(id).then((data) => {
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增员工绩效考评";
    }
  }

  /** 提交员工绩效考评表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: any) => {
      if (valid) {
        loading.value = true;
        const id = editingPerformanceId.value; // 使用存储的ID
        if (id) {
                AioveuPerformanceAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuPerformanceAPI.add(formData)
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

  /** 关闭员工绩效考评弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    // 关键修复：在关闭弹窗时重置加载状态
    loading.value = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    // 清除编辑ID
    editingPerformanceId.value = undefined;
  }

  /** 删除员工绩效考评 */
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
                AioveuPerformanceAPI.deleteByIds(ids)
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
