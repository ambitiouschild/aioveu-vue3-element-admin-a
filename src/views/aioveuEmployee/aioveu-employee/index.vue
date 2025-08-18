<template>
  <div class="app-container">
    <div class="search-container">
      <el-form ref="queryFormRef" :model="queryParams" :inline="true">
                <el-form-item label="员工ID" prop="employeeId">
                      <el-input
                          v-model="queryParams.employeeId"
                          placeholder="员工ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="员工编号" prop="empCode">
                      <el-input
                          v-model="queryParams.empCode"
                          placeholder="员工编号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                      <el-input
                          v-model="queryParams.name"
                          placeholder="姓名"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="性别" prop="gender">
                          <dict v-model="queryParams.gender" code="gender" />
                </el-form-item>
                <el-form-item label="出生日期" prop="birthDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="queryParams.birthDate"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>
                <el-form-item label="身份证号" prop="idCard">
                      <el-input
                          v-model="queryParams.idCard"
                          placeholder="身份证号"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="手机号码" prop="phone">
                      <el-input
                          v-model="queryParams.phone"
                          placeholder="手机号码"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                      <el-input
                          v-model="queryParams.email"
                          placeholder="邮箱"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="所属部门" prop="deptId">
                      <el-input
                          v-model="queryParams.deptId"
                          placeholder="所属部门"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="岗位ID" prop="positionId">
                      <el-input
                          v-model="queryParams.positionId"
                          placeholder="岗位ID"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="入职日期" prop="hireDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="queryParams.hireDate"
                          type="daterange"
                          range-separator="~"
                          start-placeholder="开始时间"
                          end-placeholder="结束时间"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>
                <el-form-item label="基本薪资" prop="salary">
                      <el-input
                          v-model="queryParams.salary"
                          placeholder="基本薪资"
                          clearable
                          @keyup.enter="handleQuery()"
                      />
                </el-form-item>
                <el-form-item label="状态：0-离职，1-在职,2-休假,3-实习" prop="status">
                      <el-input
                          v-model="queryParams.status"
                          placeholder="状态：0-离职，1-在职,2-休假,3-实习"
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
            v-hasPerm="['aioveuEmployee:aioveu-employee:add']"
            type="success"
            @click="handleOpenDialog()"
        >
          <template #icon><Plus /></template>
          新增
        </el-button>
        <el-button
            v-hasPerm="['aioveuEmployee:aioveu-employee:delete']"
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
                        key="employeeId"
                        label="员工ID"
                        prop="employeeId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="empCode"
                        label="员工编号"
                        prop="empCode"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="name"
                        label="姓名"
                        prop="name"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column label="性别" width="150" align="center">
                      <template #default="scope">
                        <DictLabel v-model="scope.row.gender" code="gender" />
                      </template>
                    </el-table-column>
                    <el-table-column
                        key="birthDate"
                        label="出生日期"
                        prop="birthDate"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="idCard"
                        label="身份证号"
                        prop="idCard"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="phone"
                        label="手机号码"
                        prop="phone"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="email"
                        label="邮箱"
                        prop="email"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="deptId"
                        label="所属部门"
                        prop="deptId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="positionId"
                        label="岗位ID"
                        prop="positionId"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="hireDate"
                        label="入职日期"
                        prop="hireDate"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="salary"
                        label="基本薪资"
                        prop="salary"
                        min-width="150"
                        align="center"
                    />
                    <el-table-column
                        key="status"
                        label="状态：0-离职，1-在职,2-休假,3-实习"
                        prop="status"
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
                v-hasPerm="['aioveuEmployee:aioveu-employee:edit']"
                type="primary"
                size="small"
                link
                @click="handleOpenDialog(scope.row.employeeId)"
            >
              <template #icon><Edit /></template>
              编辑
            </el-button>
            <el-button
                v-hasPerm="['aioveuEmployee:aioveu-employee:delete']"
                type="danger"
                size="small"
                link
                @click="handleDelete(scope.row.employeeId)"
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

    <!-- 员工信息表单弹窗 -->
    <el-dialog
        v-model="dialog.visible"
        :title="dialog.title"
        width="500px"
        @close="handleCloseDialog"
    >
      <el-form ref="dataFormRef" :model="formData" :rules="rules" label-width="100px">
                <el-form-item label="员工编号" prop="empCode">
                      <el-input
                          v-model="formData.empCode"
                          placeholder="员工编号"
                      />
                </el-form-item>

                <el-form-item label="姓名" prop="name">
                      <el-input
                          v-model="formData.name"
                          placeholder="姓名"
                      />
                </el-form-item>

                <el-form-item label="性别" prop="gender">
                          <dict v-model="formData.gender" code="gender" />
                </el-form-item>

                <el-form-item label="出生日期" prop="birthDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.birthDate"
                          type="date"
                          placeholder="出生日期"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="身份证号" prop="idCard">
                      <el-input
                          v-model="formData.idCard"
                          placeholder="身份证号"
                      />
                </el-form-item>

                <el-form-item label="手机号码" prop="phone">
                      <el-input
                          v-model="formData.phone"
                          placeholder="手机号码"
                      />
                </el-form-item>

                <el-form-item label="邮箱" prop="email">
                      <el-input
                          v-model="formData.email"
                          placeholder="邮箱"
                      />
                </el-form-item>

                <el-form-item label="所属部门" prop="deptId">
                      <el-input
                          v-model="formData.deptId"
                          placeholder="所属部门"
                      />
                </el-form-item>

                <el-form-item label="岗位ID" prop="positionId">
                      <el-input
                          v-model="formData.positionId"
                          placeholder="岗位ID"
                      />
                </el-form-item>

                <el-form-item label="入职日期" prop="hireDate">
                      <el-date-picker
                          class="!w-[240px]"
                          v-model="formData.hireDate"
                          type="date"
                          placeholder="入职日期"
                          value-format="YYYY-MM-DD"
                      />
                </el-form-item>

                <el-form-item label="基本薪资" prop="salary">
                      <el-input
                          v-model="formData.salary"
                          placeholder="基本薪资"
                      />
                </el-form-item>

                <el-form-item label="状态：0-离职，1-在职,2-休假,3-实习" prop="status">
                      <el-input
                          v-model="formData.status"
                          placeholder="状态：0-离职，1-在职,2-休假,3-实习"
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
    name: "AioveuEmployee",
    inheritAttrs: false,
  });

  import AioveuEmployeeAPI, { AioveuEmployeePageVO, AioveuEmployeeForm, AioveuEmployeePageQuery } from "@/api/aioveuEmployee/aioveu-employee";

  const queryFormRef = ref();
  const dataFormRef = ref();

  const loading = ref(false);
  const removeIds = ref<number[]>([]);
  const total = ref(0);

  const queryParams = reactive<AioveuEmployeePageQuery>({
    pageNum: 1,
    pageSize: 10,
  });

  // 员工信息表格数据
  const pageData = ref<AioveuEmployeePageVO[]>([]);

  // 弹窗
  const dialog = reactive({
    title: "",
    visible: false,
  });

  // 员工信息表单数据
  const formData = reactive<AioveuEmployeeForm>({

    /** 员工编号 */
    empCode:  '100',
    /** 姓名 */
    name:  '雒世松',
    /** 性别 */
    gender:  1,
    /** 出生日期 */
    birthDate:  new Date('1999-01-01'), // 转换为 Date 对象,
    /** 身份证号 */
    idCard:  '410',
    /** 手机号码 */
    phone:  '13061656199',
    /** 邮箱 */
    email:  'ambitiouschild@qq.com',
    /** 所属部门 */
    deptId:  1,
    /** 岗位ID */
    positionId:  2,
    /** 入职日期 - 设置为当前日期 */
    hireDate:  new Date(), // 当前日期对象,
    /** 基本薪资 */
    salary:  50000,
    /** 状态：0-离职，1-在职,2-休假,3-实习 */
    status:  1,
  });

  // 员工信息表单校验规则
  const rules = reactive({
                      empCode: [{ required: true, message: "请输入员工编号", trigger: "blur" }],
                      name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
                      gender: [{ required: true, message: "请输入性别", trigger: "blur" }],
                      phone: [{ required: true, message: "请输入手机号码", trigger: "blur" }],
                      deptId: [{ required: true, message: "请输入所属部门", trigger: "blur" }],
                      positionId: [{ required: true, message: "请输入岗位ID", trigger: "blur" }],
                      hireDate: [{ required: true, message: "请输入入职日期", trigger: "blur" }],
                      salary: [{ required: true, message: "请输入基本薪资", trigger: "blur" }],
                      status: [{ required: true, message: "请输入状态：0-离职，1-在职,2-休假,3-实习", trigger: "blur" }],
  });

  /** 查询员工信息 */
  function handleQuery() {
    loading.value = true;
          AioveuEmployeeAPI.getPage(queryParams)
        .then((data) => {
          pageData.value = data.list;
          total.value = data.total;
        })
        .finally(() => {
          loading.value = false;
        });
  }

  /** 重置员工信息查询 */
  function handleResetQuery() {
    queryFormRef.value!.resetFields();
    queryParams.pageNum = 1;
    handleQuery();
  }

  /** 行复选框选中记录选中ID集合 */
  function handleSelectionChange(selection: AioveuEmployeePageVO[]) {
    removeIds.value = selection
      .map(item => item.employeeId)
      .filter((employeeId): employeeId is number => employeeId !== undefined && employeeId !== null) as number[];
  }

  // 在组件中添加一个变量存储当前编辑的员工ID
  const editingEmployeeId = ref<number | undefined>(undefined);

  /** 打开员工信息弹窗 */
  function handleOpenDialog(employeeId?: number) {
    dialog.visible = true;


    if (employeeId) {
      dialog.title = "修改员工信息";
      editingEmployeeId.value = employeeId; // 保存员工ID
      loading.value = true;

            AioveuEmployeeAPI.getFormData(employeeId).then((data) => {
              // 将获取的数据赋值给 formData
        Object.assign(formData, data);
      });
    } else {
      dialog.title = "新增员工信息";
    }
  }

  /** 提交员工信息表单 */
  function handleSubmit() {
    dataFormRef.value.validate((valid: boolean) => {
      if (valid) {
        loading.value = true;
        const id = editingEmployeeId.value; // 使用存储的员工ID


        if (id) {
          // 更新操作 - 使用存储的员工ID
                AioveuEmployeeAPI.update(id, formData)
              .then(() => {
                ElMessage.success("修改成功");
                handleCloseDialog();
                handleResetQuery();
              })
              .catch((error) => {
                // 4. 错误处理
                if (error.response?.data?.message?.includes("已存在")) {
                  ElMessage.error(error.response.data.message);
                } else if (error.response?.data?.message) {
                  ElMessage.error("修改失败: " + error.response.data.message);
                } else {
                  ElMessage.error("修改失败: " + error.message);
                }
              })
              .finally(() => (loading.value = false));
        } else {
                AioveuEmployeeAPI.add(formData)
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

  /** 关闭员工信息弹窗 */
  function handleCloseDialog() {
    dialog.visible = false;
    dataFormRef.value.resetFields();
    dataFormRef.value.clearValidate();
    editingEmployeeId.value = undefined; // 清除员工ID
  }

  /** 删除员工信息 */
  function handleDelete(employeeId?: number) {
    const ids = [employeeId || removeIds.value].join(",");
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
                AioveuEmployeeAPI.deleteByIds(ids)
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
