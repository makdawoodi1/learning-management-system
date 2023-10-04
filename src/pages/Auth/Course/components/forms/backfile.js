// {/* <Row>
//             {form.getFieldValue("quiz") &&
//               form.getFieldValue("question-type") && (
//                 <>
//                   <Col xs={12}>
//                     <Form.Item
//                       label="Quiz Question"
//                       name="quiz-question"
//                       rules={[
//                         {
//                           required: true,
//                           message: "Please input the quiz question!",
//                         },
//                       ]}
//                     >
//                       <Input
//                         size="large"
//                         className="w-full rounded placeholder:text-sm placeholder:text-gray-500 py-2 border-gray-500 "
//                         placeholder="Quiz Question"
//                       />
//                     </Form.Item>
//                     <Form.List name="questions">
//                       {(fields, { add, remove }) => (
//                         <div
//                           style={{
//                             display: "flex",
//                             rowGap: 16,
//                             flexDirection: "column",
//                           }}
//                         >
//                           {fields.map((field) => (
//                             <Card
//                               className="p-4"
//                               title={`Item ${field.name + 1}`}
//                               key={field.key}
//                               extra={
//                                 <CloseOutlined
//                                   onClick={() => {
//                                     remove(field.name);
//                                   }}
//                                 />
//                               }
//                             >
//                               <Form.Item
//                                 label="Option"
//                                 name={[field.name, "option"]}
//                               >
//                                 <Input />
//                               </Form.Item>

//                               {/* Checkbox Group */}
//                               {form.getFieldValue('question-type') === 'Multiple Choice' &&
//                               <Form.Item>
//                                 <Form.List name={[field.name, "checkboxes"]}>
//                                   {(subFields, subOpt) => (
//                                     <div
//                                       style={{
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         rowGap: 16,
//                                       }}
//                                     >
//                                       {subFields.map((subField) => (
//                                         <Space key={subField.key}>
//                                           <Form.Item
//                                             noStyle
//                                             name={[subField.name, "checkbox"]}
//                                             valuePropName="checked"
//                                           >
//                                             <Checkbox>
//                                               {form.getFieldValue([
//                                                 field.name,
//                                                 "checkboxes",
//                                                 subField.name,
//                                                 "label",
//                                               ])}
//                                             </Checkbox>
//                                           </Form.Item>
//                                           <Form.Item
//                                             noStyle
//                                             name={[subField.name, "label"]}
//                                             initialValue=""
//                                           >
//                                             <Input
//                                               placeholder="Checkbox label"
//                                               style={{ width: "60%" }}
//                                             />
//                                           </Form.Item>
//                                           <CloseOutlined
//                                             onClick={() => {
//                                               subOpt.remove(subField.name);
//                                               // You can update a state or store the values here.
//                                             }}
//                                           />
//                                         </Space>
//                                       ))}
//                                       <Button
//                                         type="dashed"
//                                         onClick={() => {
//                                           const newItemIndex = subOpt.add({
//                                             label: "",
//                                           });
//                                           // You can update a state or store the values here.
//                                         }}
//                                         block
//                                       >
//                                         + Add Checkbox
//                                       </Button>
//                                     </div>
//                                   )}
//                                 </Form.List>
//                               </Form.Item>}

//                               {/* Radio Group */}
//                               {form.getFieldValue('question-type') === 'Single Choice' &&
//                               <Form.Item>
//                                 <Form.List name={[field.name, "radios"]}>
//                                   {(subFields, subOpt) => (
//                                     <div
//                                       style={{
//                                         display: "flex",
//                                         flexDirection: "column",
//                                         rowGap: 16,
//                                       }}
//                                     >
//                                       {subFields.map((subField) => (
//                                         <Space key={subField.key}>
//                                           <Form.Item
//                                             noStyle
//                                             name={[subField.name, "radio"]}
//                                           >
//                                             <Radio>{`Radio ${
//                                               subField.name + 1
//                                             }`}</Radio>
//                                           </Form.Item>
//                                           <CloseOutlined
//                                             onClick={() => {
//                                               subOpt.remove(subField.name);
//                                             }}
//                                           />
//                                         </Space>
//                                       ))}
//                                       <Button
//                                         type="dashed"
//                                         onClick={() => {
//                                           subOpt.add();
//                                           console.log(form.getFieldsValue());
//                                         }}
//                                         block
//                                       >
//                                         + Add Single Choice Question
//                                       </Button>
//                                     </div>
//                                   )}
//                                 </Form.List>
//                               </Form.Item>}
//                             </Card>
//                           ))}

//                           <Button type="dashed" onClick={() => add()} block>
//                             <PlusOutlined /> Add Option
//                           </Button>
//                         </div>
//                       )}
//                     </Form.List>
//                   </Col>
//                   <Col xs={12} lg={state.active ? 10 : 12}>
//                     <Form.Item>
//                       <Button
//                         type="dashed"
//                         className="d-flex align-items-center justify-content-center mx-auto"
//                         // onClick={handleLessonSubmit}
//                         style={{
//                           width: "100%",
//                         }}
//                         icon={
//                           state.mode === "add" ? (
//                             <PlusOutlined />
//                           ) : (
//                             <RiEdit2Line />
//                           )
//                         }
//                       >
//                         {state.mode === "add" ? "Add Question" : "Edit Question"}
//                       </Button>
//                     </Form.Item>
//                   </Col>
//                   {state.active && (
//                     <Col xs={12} lg={2}>
//                       <Form.Item>
//                         <Button
//                           type="dashed"
//                           className="d-flex align-items-center justify-content-center mx-auto btn-danger-custom"
//                           // onClick={clearState}
//                           style={{
//                             width: "100%",
//                           }}
//                         >
//                           Cancel
//                         </Button>
//                       </Form.Item>
//                     </Col>
//                   )}
//                 </>
//               )}
//           </Row> */}