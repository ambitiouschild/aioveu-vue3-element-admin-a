import request from "@/utils/request";

const AIOVEUDEPARTMENT_BASE_URL = "/api/v1/aioveu-department";

const AioveuDepartmentAPI = {
    /** 获取公司部门组织结构分页数据 */
    getPage(queryParams?: AioveuDepartmentPageQuery) {
        return request<any, PageResult<AioveuDepartmentPageVO[]>>({
            url: `${AIOVEUDEPARTMENT_BASE_URL}/page`,
            method: "get",
            params: queryParams,
        });
    },
    /**
     * 获取公司部门组织结构表单数据
     *
     * @param id 公司部门组织结构ID
     * @returns 公司部门组织结构表单数据
     */
    getFormData(id: number) {
        return request<any, AioveuDepartmentForm>({
            url: `${AIOVEUDEPARTMENT_BASE_URL}/${id}/form`,
            method: "get",
        });
    },

    /**
     *  添加公司部门组织结构
     *
     *  @param data 公司部门组织结构表单数据
     */
    add(data: AioveuDepartmentForm) {
        return request({
            url: `${AIOVEUDEPARTMENT_BASE_URL}`,
            method: "post",
            // data: data, 属性简写（变量同名）
        });
    },

    /**
     * 更新公司部门组织结构
     *
     * @param id 公司部门组织结构ID
     * @param data 公司部门组织结构表单数据
     */
     update(id: number, data: AioveuDepartmentForm) {
        return request({
            url: `${AIOVEUDEPARTMENT_BASE_URL}/${id}`,
            method: "put",
            // data: data, 属性简写（变量同名）
        });
    },

    /**
     * 批量删除公司部门组织结构，多个以英文逗号(,)分割
     *
     * @param ids 公司部门组织结构ID字符串，多个以英文逗号(,)分割
     */
     deleteByIds(ids: string) {
        return request({
            url: `${AIOVEUDEPARTMENT_BASE_URL}/${ids}`,
            method: "delete",
        });
    }
}

export default AioveuDepartmentAPI;

/** 公司部门组织结构分页查询参数 */
export interface AioveuDepartmentPageQuery extends PageQuery {
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 上级部门ID，用于构建部门树 */
    parentDeptId?: number;
    /** 部门经理，关联employee表 */
    managerId?: number;
}

/** 公司部门组织结构表单对象 */
export interface AioveuDepartmentForm {
    /** 部门ID */
    deptId?:  number;
    /** 部门名称 */
    deptName?:  string;
    /** 上级部门ID，用于构建部门树 */
    parentDeptId?:  number;
    /** 部门经理，关联employee表 */
    managerId?:  number;
}

/** 公司部门组织结构分页对象 */
export interface AioveuDepartmentPageVO {
    /** 部门ID */
    deptId?: number;
    /** 部门名称 */
    deptName?: string;
    /** 上级部门ID，用于构建部门树 */
    parentDeptId?: number;
    /** 部门经理，关联employee表 */
    managerId?: number;
}
